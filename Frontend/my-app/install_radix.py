import os
import re
import subprocess

directory = '/Users/admin/Documents/Distiled Tech/BloomifyFinal/Bloomify/Frontend/my-app/src'
pattern = re.compile(r'from\s+["\'](@radix-ui/[^"\']+)["\']')
packages = set()

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            matches = pattern.findall(content)
            for m in matches:
                packages.add(m)

if packages:
    cmd = ['npm', 'install'] + list(packages) + ['next-themes']
    print("Running:", " ".join(cmd))
    subprocess.run(cmd, check=True)
else:
    print("No radix-ui packages found.")
