import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUserInitials(name: string): string {
	if (!name || name.trim().length === 0) return "";

	const words = name
		.trim()
		.split(" ")
		.filter((word) => word.length > 0);

	// Handle single letter case
	if (name.length === 1) return name.toUpperCase();

	// Handle single name case - return first two letters
	if (words.length === 1) {
		return name.slice(0, 2).toUpperCase();
	}

	// Handle 4 or more words - return first and third initials
	if (words.length >= 4) {
		return (words[0][0] + words[2][0]).toUpperCase();
	}

	// Handle 2-3 words - return first and last initials
	return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}