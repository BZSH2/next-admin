const uncssConfig = {
  routes: ["/"],
  outputFile: ".reports/uncss/optimized.css",
  reportFile: ".reports/uncss/report.json",
  timeout: 1500,
  ignore: [],
  inject(window) {
    window.document.documentElement.classList.add("dark");
  },
};

module.exports = uncssConfig;
