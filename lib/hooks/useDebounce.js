"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};

/**
 * Debounce hook
 *
 * Tar input og delayer signalet slik at man kan velge selv hvilken oppdaterings syklus man vil ha
 * Default vaule er 500ms,
 */
