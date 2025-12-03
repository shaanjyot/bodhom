#!/bin/bash
# Script to push to GitHub with authentication

echo "Pushing to GitHub repository: https://github.com/shaanjyot/bodhom"
echo ""
echo "You'll need to authenticate with your GitHub Personal Access Token."
echo "If you don't have one, create it at: https://github.com/settings/tokens"
echo ""
echo "When prompted:"
echo "  Username: shaanjyot"
echo "  Password: <your-personal-access-token>"
echo ""

git push -u origin main

