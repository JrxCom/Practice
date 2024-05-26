export default {
    data() {
        return {
            themeCode: void 0,
            themeStyle: {}
        }
    },
    watch: {
        themeCode(newvalue) {
            if (Boolean(newvalue) === false || JSON.parse(newvalue) === false) {
                document.querySelector("body").setAttribute("vs-theme", "light");
                this.themeStyle = {
                    "--theme-font-color": "#2c3e50",
                    "--theme-background-color": "#F4F7F8",
                    "--theme-background-color_": "#ffffff",
                    "--theme-background-color-hover": "#F9FCFD",
                };
                localStorage.setItem("theme", false);
            } else {
                document.querySelector("body").setAttribute("vs-theme", "dark");
                this.themeStyle = {
                    "--theme-font-color": "#ffffff",
                    "--theme-background-color": "#000000",
                    "--theme-background-color_": "#1E2023",
                    "--theme-background-color-hover": "#18191C",
                };
                localStorage.setItem("theme", true);
            }
        }
    },
    created() {
        if (Boolean(localStorage.getItem("theme")) === false || JSON.parse(localStorage.getItem("theme")) === false) {
            this.themeCode = false
        } else {
            this.themeCode = true
        }
    },
};
