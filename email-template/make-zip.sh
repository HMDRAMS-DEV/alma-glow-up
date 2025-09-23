#!/bin/bash

echo "Creating Loops email template zip..."

# Go to the template directory
cd template

# Copy images if they exist in the parent directory
if [ -f "../cover.jpeg" ]; then
    cp ../cover.jpeg img/
    echo "✅ Copied cover.jpeg"
fi

if [ -f "../download.svg" ]; then
    cp ../download.svg img/
    echo "✅ Copied download.svg"
fi

# Create the zip file
zip -r alma-email-template.zip index.mjml img/

echo ""
echo "🎉 Created alma-email-template.zip!"
echo ""
echo "📁 Contents:"
echo "   - index.mjml"
echo "   - img/cover.jpeg"
echo "   - img/download.svg"
echo ""
echo "📧 Ready to upload to Loops!"
echo "   Go to: Loops → Transactional → Create → Code styling → Upload ZIP"