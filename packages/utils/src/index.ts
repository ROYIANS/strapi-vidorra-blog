// Utility functions
export const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};
