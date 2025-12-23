#!/usr/bin/env node
/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:36:55
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

function bumpVersion(type) {
  const currentVersion = packageJson.version;
  const versionParts = currentVersion.split('.').map(Number);

  switch (type) {
    case 'patch':
      versionParts[2]++;
      break;
    case 'minor':
      versionParts[1]++;
      versionParts[2] = 0;
      break;
    case 'major':
      versionParts[0]++;
      versionParts[1] = 0;
      versionParts[2] = 0;
      break;
    default:
      throw new Error('Invalid version type. Use patch, minor, or major.');
  }

  const newVersion = versionParts.join('.');
  packageJson.version = newVersion;

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`Version bumped from ${currentVersion} to ${newVersion}`);

  // Create git tag
  try {
    execSync(`git add package.json`);
    execSync(`git commit -m "chore: bump version to ${newVersion}"`);
    execSync(`git tag v${newVersion}`);
    console.log(`Git tag v${newVersion} created`);
  } catch (error) {
    console.error('Failed to create git tag:', error.message);
  }

  return newVersion;
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node scripts/version.js <patch|minor|major>');
  process.exit(1);
}

const versionType = args[0];
try {
  const newVersion = bumpVersion(versionType);
  console.log(`✅ Version successfully bumped to ${newVersion}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
