import { useEffect, useRef, useState } from 'react';

export function useSvgImport(iconName: string) {
    const importedIconRef = useRef<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>();
    useEffect(() => {
        setLoading(true);
        const importSvgIcon = async (): Promise<void> => {
            try {
                /* @vite-ignore */
                const path: string = `../assets/icons/${iconName}.svg?react`
                const importedIconModule = await import(/* @vite-ignore */ path);

                const importedIcon = importedIconModule.default;
                importedIconRef.current = importedIcon
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        importSvgIcon();
    }, [iconName]);
    return { error, loading, SvgIcon: importedIconRef.current };
}
