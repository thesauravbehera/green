import os
import re

directory = '/Users/admin/Documents/Distiled Tech/BloomifyFinal/Bloomify/Frontend/my-app/src'
# This pattern matches @radix-ui/react-tabs@1.1.3 or clsx@2.1.1 etc.
# We don't want to match relative imports that somehow have an @, but that's unlikely.
# Specifically, we match alphanumeric, dashes, slashes, and @ at the start.
pattern = re.compile(r'(from\s+["\'])([^"\']+)@[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9.]+)?(["\'])')

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = pattern.sub(r'\1\2\3', content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Fixed {filepath}")
