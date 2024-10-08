import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"
import { lighten, darken } from "polished"

import { keyframes } from "@emotion/react"

function lightenColor(mainColor, value) {
    return lighten(value, mainColor)
}
function darkenColor(mainColor, value) {
    return darken(value, mainColor)
}

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const scaleAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const scaleAnimationOffset = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
  100% { transform: translate(-50%, -50%) scale(1); }
`

const customTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            ".bgPage": {
                bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
            ".bgContent": {
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.pageBackground.light, 0.05),
            },
            ".contentContainer": {
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.contentBackground.light, 0),
                border: "4px solid green",
            },
            ".tokenBalanceContainer": {
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.contentBackground.light, 0),
                border: "4px solid gold",
            },
            ".errorText": {
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.contentBackground.light, 0),
                border: "4px solid red",
            },
            ".tooltip": {
                bg:
                    props.colorMode === "dark"
                        ? `${lightenColor(props.theme.colors.pageBackground.dark, 0.1)} !important`
                        : `${darkenColor(props.theme.colors.pageBackground.light, 0.05)} !important`,
                [cssVar("popper-arrow-bg").variable]:
                    props.colorMode === "dark"
                        ? `${lightenColor(props.theme.colors.pageBackground.dark, 0.1)} !important`
                        : `${darkenColor(props.theme.colors.pageBackground.light, 0.05)} !important`,
            },
            ".tooltipLabel": {
                paddingX: "10px",
                paddingY: "5px",
                borderRadius: "7px",
                color: "var(--chakra-colors-chakra-body-text)",
            },
            // Increase the tooltip arrow size
            "div .chakra-tooltip__arrow": {
                width: "130% !important",
                height: "130% !important",
            },
            ".rainbowButtonAnimation": {
                animation: `${rainbowAnimation} 20s linear infinite, ${scaleAnimation} 2s ease-in-out infinite`,
            },
            ".rainbowButtonAnimationOffset": {
                animation: `${rainbowAnimation} 20s linear infinite, ${scaleAnimationOffset} 2s ease-in-out infinite`,
            },
        }),
    },
    components: {
        Code: {
            baseStyle: (props: StyleFunctionProps) => ({
                bg:
                    props.colorMode === "dark"
                        ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                        : darkenColor(props.theme.colors.pageBackground.light, 0.05),
            }),
        },
        Drawer: {
            variants: {
                solid: (props) => ({
                    dialog: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    },
                }),
            },
            defaultProps: {
                variant: "solid",
            },
        },
        Button: {
            variants: {
                HeaderButton: (props: StyleFunctionProps) => ({
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.1)
                            : darkenColor(props.theme.colors.pageBackground.light, 0.05),
                    _hover: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.2)
                                : darkenColor(props.theme.colors.pageBackground.light, 0.15),
                    },
                    _active: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.3)
                                : darkenColor(props.theme.colors.pageBackground.light, 0.2),
                    },
                }),
                RainbowButton: (props: StyleFunctionProps) => ({
                    filter: "brightness(1.7)",
                    _hover: {
                        filter: "brightness(2)",
                    },
                    _active: {
                        filter: "brightness(2.3)",
                    },
                    backgroundImage: "linear-gradient(270deg, pink, purple, blue, red, blue, purple, pink)",
                    backgroundSize: "1000% 1000%",
                    textShadow: props.colorMode === "dark" ? "0px 0px 5px black" : "0px",
                }),
                MintNftDisabledButton: (props: StyleFunctionProps) => ({
                    backgroundImage: "linear-gradient(270deg, pink, purple, blue, red, blue, purple, pink)",
                    backgroundSize: "1000% 1000%",
                    textShadow: props.colorMode === "dark" ? "0px 0px 5px black" : "0px",
                    cursor: "default",
                    pointerEvents: "none",
                    color: "white",
                }),
                WalletButton: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "orange",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    _hover: {
                        bg: props.colorMode === "dark" ? darkenColor(props.theme.colors.orange, 0.2) : lightenColor(props.theme.colors.orange, 0.2),
                    },
                    _active: {
                        bg: "orange",
                    },
                }),
                ShowResultsButton: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "green",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    _hover: {
                        bg: props.colorMode === "dark" ? darkenColor(props.theme.colors.green, 0.2) : lightenColor(props.theme.colors.green, 0.2),
                    },
                    _active: {
                        bg: "green",
                    },
                }),
                ShowResultsButtonError: (props: StyleFunctionProps) => ({
                    border: "3px solid",
                    borderColor: "red",
                    fontSize: "sm",
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.05)
                            : darkenColor(props.theme.colors.contentBackground.light, 0),
                    cursor: "default",
                }),
            },
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#031c11",
        },
        contentBackground: {
            light: "#EDF2F7",
            dark: "#053520",
        },
        gold: "#e7c60d",
        red: "#EC420C",
        green: "#289e33",
        blue: "#0da6d8",
        pink: "#b124b1",
        purple: "#54199b",
        orange: "#d66b13",
    },
})

export default customTheme
