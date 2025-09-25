import { useEffect, useMemo, useState } from 'react';

type UseCurrencyResult = {
	currencyCode: string;
	exchangeRateToLocal: number; // USD -> local
	formatFromUsdCents: (usdCents: number) => string;
	isLoading: boolean;
	isError: boolean;
};

const DEFAULT_CURRENCY = 'USD';

/**
 * Detects visitor currency via IP geolocation and formats amounts accordingly.
 * - Prices in the app are stored as USD cents; this hook converts for display only.
 * - Stripe/backend amounts remain unchanged.
 */
export function useCurrency(): UseCurrencyResult {
	const [currencyCode, setCurrencyCode] = useState<string>(DEFAULT_CURRENCY);
	const [rate, setRate] = useState<number>(1); // USD -> local
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		let isMounted = true;

		async function detectCurrencyAndRate() {
			setLoading(true);
			setError(false);
			try {
				// 1) Detect currency code from IP (ipapi provides currency field; no API key required)
				// Fallback to USD on failure
				const geoResp = await fetch('https://ipapi.co/json/');
				let detectedCurrency = DEFAULT_CURRENCY;
				if (geoResp.ok) {
					const geoData = await geoResp.json();
					if (typeof geoData?.currency === 'string' && geoData.currency.length === 3) {
						detectedCurrency = geoData.currency;
					}
				}

				// 2) Get exchange rate USD -> detectedCurrency
				let localRate = 1;
				if (detectedCurrency !== DEFAULT_CURRENCY) {
					const rateResp = await fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${encodeURIComponent(detectedCurrency)}`);
					if (rateResp.ok) {
						const rateData = await rateResp.json();
						const value = rateData?.rates?.[detectedCurrency];
						if (typeof value === 'number' && isFinite(value) && value > 0) {
							localRate = value;
						}
					}
				}

				if (!isMounted) return;
				setCurrencyCode(detectedCurrency);
				setRate(localRate);
			} catch (_e) {
				if (!isMounted) return;
				setCurrencyCode(DEFAULT_CURRENCY);
				setRate(1);
				setError(true);
			} finally {
				if (isMounted) setLoading(false);
			}
		}

		detectCurrencyAndRate();
		return () => {
			isMounted = false;
		};
	}, []);

	const formatter = useMemo(() => {
		try {
			return new Intl.NumberFormat(undefined, {
				style: 'currency',
				currency: currencyCode,
				currencyDisplay: 'symbol',
				maximumFractionDigits: 2,
			});
		} catch (_e) {
			return new Intl.NumberFormat(undefined, {
				style: 'currency',
				currency: DEFAULT_CURRENCY,
				maximumFractionDigits: 2,
			});
		}
	}, [currencyCode]);

	const formatFromUsdCents = (usdCents: number) => {
		const usd = usdCents / 100;
		const local = usd * rate;
		return formatter.format(local);
	};

	return {
		currencyCode,
		exchangeRateToLocal: rate,
		formatFromUsdCents,
		isLoading: loading,
		isError: error,
	};
}

export default useCurrency;


