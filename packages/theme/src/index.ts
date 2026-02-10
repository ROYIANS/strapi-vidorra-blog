// Theme system core
export interface Theme {
    name: string;
    colors: Record<string, string>;
    fonts: Record<string, string>;
}

export const defaultTheme: Theme = {
    name: 'vidorra-default',
    colors: {
        primary: '#699054',
        'primary-hover': '#84a476',
    },
    fonts: {},
};
