# Troubleshooting Guide

## Blank Screen Issues

### 1. Dependencies Not Installed
**Problem**: Blank screen with no content
**Solution**: 
```bash
# Windows PowerShell (if you get execution policy error):
cmd /c npm install

# Or change execution policy (run as admin):
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
```

### 2. Dev Server Not Running
**Problem**: Page shows "Cannot GET /" or connection error
**Solution**:
```bash
cmd /c npm run dev
```
Then open the URL shown in terminal (usually http://localhost:3000)

### 3. Browser Console Errors
**Problem**: Check browser console (F12) for errors
**Common Issues**:
- **Module not found**: Dependencies not installed → Run `npm install`
- **Cannot read property**: Data structure issue → Check demoData.js
- **React error**: Component error → Check ErrorBoundary message

### 4. Port Already in Use
**Problem**: "Port 3000 is already in use"
**Solution**: 
- Change port in `vite.config.js`:
```js
server: {
  port: 3001, // or any other port
}
```

### 5. CSS Not Loading
**Problem**: Styles not applied, unstyled content
**Solution**:
- Verify `src/index.css` exists
- Check `tailwind.config.js` is correct
- Ensure PostCSS is configured (`postcss.config.js`)

### 6. React Router Issues
**Problem**: Routes not working, 404 errors
**Solution**:
- Ensure all page components exist in `src/pages/`
- Check import paths in `App.jsx`
- Verify BrowserRouter is wrapping routes

## Quick Fixes

### Clear Cache and Reinstall
```bash
# Delete node_modules and lock file
rmdir /s node_modules
del package-lock.json

# Reinstall
cmd /c npm install

# Start dev server
cmd /c npm run dev
```

### Check File Structure
Ensure these files exist:
- `src/main.jsx`
- `src/App.jsx`
- `src/index.css`
- `src/data/demoData.js`
- All page components in `src/pages/`
- All components in `src/components/`

### Verify Browser
- Use Chrome, Firefox, or Edge (latest versions)
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Check browser console for errors (F12)

## Still Not Working?

1. **Check Terminal Output**: Look for error messages when running `npm run dev`
2. **Browser Console**: Open DevTools (F12) and check Console tab
3. **Network Tab**: Check if files are loading (F12 → Network)
4. **Verify Node Version**: Should be Node.js 16+ (`node --version`)

## Getting Help

If issues persist:
1. Share the error message from browser console
2. Share the terminal output from `npm run dev`
3. Verify Node.js and npm are installed: `node --version` and `npm --version`

