echo "Resetting project..."

echo "Removing installed packages..."
rm -rf node_modules
echo "Old packages removed successfully"

echo "Installing new packages..."
npm install
echo "Packages installed successfully"

echo "Running server ..."
`node server`
