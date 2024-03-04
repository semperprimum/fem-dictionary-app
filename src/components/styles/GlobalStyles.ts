import { createGlobalStyle } from "styled-components";

type Font = "sans" | "serif" | "mono";

export const GlobalStyles = createGlobalStyle<{ $font: Font }>`
    :root {
        --fw-regular: 400;
        --fw-bold   : 700;

        --fs-100: 0.875rem;   // Source (14)
        --fs-200: 0.9375rem;  // Main text (15)
        --fs-300: 1rem;       // Subheading (16)
        --fs-400: 1.125rem;   // Part of speech (18)
        --fs-500: 2rem;       // Heading (32)

        @media only screen and (min-width: 48em) {
            --fs-100: 0.875rem;
            --fs-200: 1.125rem;
            --fs-300: 1.25rem;
            --fs-400: 1.5rem;
            --fs-500: 4rem;
        }
    }

    body {
        font-family: ${(props) =>
          props.$font === "serif"
            ? "Lora Variable, serif"
            : props.$font === "sans"
            ? "Inter Variable, sans-serif"
            : "Inconsolata Variable, monospace"};
        background-color       : ${(props) => props.theme.background};
        color                  : ${(props) => props.theme.text};
        font-size              : var(--fs-200);
        font-style             : normal;
        font-variation-settings: "ital" 0;
    }


    /* 
        Improved screen reader only CSS class
        @author Gaël Poupard
    */
    .sr-only {
        border           : 0 !important;
        clip             : rect(1px, 1px, 1px, 1px) !important; 
        -webkit-clip-path: inset(50%) !important;
        clip-path        : inset(50%) !important;                
        height           : 1px !important;
        margin           : -1px !important;
        overflow         : hidden !important;
        padding          : 0 !important;
        position         : absolute !important;
        width            : 1px !important;
        white-space      : nowrap !important;                    
    }`;
