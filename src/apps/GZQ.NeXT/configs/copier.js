export const copier = [
    {
        check() {
            return !!document.execCommand
        },
        file : "execCommand",
        fn   : "copy",
    },
    {
        check() {
            return window.clipboardData
        },
        file : "clipboardData",
        fn   : "copy",
    },
]

export default copier
