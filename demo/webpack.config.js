const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	output: {
		path: path.join(__dirname, "dist"), // the bundle output path
		filename: "bundle.js", // the name of the bundle
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html", // to import index.html file inside index.js
		}),
	],
	devServer: {
		port: 3000, // you can change the port
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/, // .js and .jsx files
				exclude: /node_modules/, // excluding the node_modules folder
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: "url-loader",
				options: { limit: false },
			},
		],
	},
	devtool: "source-map",
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};
