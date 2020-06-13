const requireAll = requireContext => requireContext.keys().map(requireContext);
const svgs = require.context("./svg", false, /\.svg$/);
console.log('svgs',svgs)
requireAll(svgs);
