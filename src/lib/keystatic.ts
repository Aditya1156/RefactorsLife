/** The editor works locally in development, and in production once GitHub storage is configured. */
export const editorEnabled = () => process.env.NODE_ENV !== "production" || !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;
