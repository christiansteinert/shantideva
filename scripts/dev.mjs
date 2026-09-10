import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = resolve(root, 'app/shantideva-phonegap');
const local = resolve(root, '.local/cordova');
const cordova = resolve(app, 'node_modules/.bin/cordova');
const [action = 'serve', platform = 'ios', ...args] = process.argv.slice(2);

function run(command, argv, cwd = root) {
  const result = spawnSync(command, argv, { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

function assets(destination, development) {
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(destination, { recursive: true });
  cpSync(resolve(root, 'src/web'), destination, { recursive: true });
  if (development) {
    const html = readFileSync(resolve(destination, 'index.html'), 'utf8');
    const developmentHtml = html.replace(
      '<head>',
      '<head>\n<script>window.SHANTIDEVA_LOCAL_DEV = true;</script>',
    );
    writeFileSync(resolve(destination, 'index.html'), developmentHtml);
  }
}

function prepare() {
  if (!existsSync(resolve(local, 'config.xml'))) {
    throw new Error(`Run npm run setup:${platform} first.`);
  }
  assets(resolve(local, 'www'), true);
  run(cordova, ['prepare', platform], local);
  const bridgePath = resolve(local, 'platforms/ios/www/cordova.js');
  if (
    platform === 'ios'
    && !readFileSync(bridgePath, 'utf8').includes('Platform: cordova-ios')
  ) {
    throw new Error('Generated Cordova bridge is invalid. Restore dependencies with npm ci in app/shantideva-phonegap, then recreate the local platform.');
  }
}

function setup() {
  if (!['ios', 'android'].includes(platform)) throw new Error('Choose ios or android');
  if (!existsSync(cordova)) run('npm', ['ci', '--no-audit', '--no-fund'], app);
  mkdirSync(local, { recursive: true });

  for (const file of readdirSync(app)) {
    if (/\.(png|xml|gradle|pro)$/.test(file) && file !== 'config.xml') {
      cpSync(resolve(app, file), resolve(local, file));
    }
  }

  // Local bundle identity keeps test data separate from an installed release.
  const config = readFileSync(resolve(app, 'config.xml'), 'utf8')
    .replace('id="de.christian_steinert.shantideva_verses"', 'id="de.christiansteinert.shantidevaverses.dev"')
    .replace('<name>Shantideva</name>', '<name>Shantideva Dev</name>')
    .replace(/\s*<engine[^>]*\/>/g, '')
    .replace(/\s*<feature name="(?:SplashScreen|CDVWKWebViewEngine)">[\s\S]*?<\/feature>/g, '')
    .replace(/\s*<preference name="CordovaWebViewEngine"[^>]*\/>/g, '')
    .replace('<content src="index.html" />', '<content src="index.html" />\n    <preference name="scheme" value="app" />\n    <preference name="hostname" value="localhost" />');
  writeFileSync(resolve(local, 'config.xml'), config);

  const packagePath = resolve(local, 'package.json');
  if (!existsSync(packagePath)) {
    const localPackage = {
      name: 'shantideva-local',
      version: '1.0.0',
      private: true,
      cordova: { platforms: [], plugins: {} },
    };
    writeFileSync(packagePath, JSON.stringify(localPackage, null, 2));
  }

  assets(resolve(local, 'www'), true);
  if (!existsSync(resolve(local, 'platforms', platform))) {
    const platformPackage = resolve(app, `node_modules/cordova-${platform}/package.json`);
    const platformVersion = JSON.parse(readFileSync(platformPackage, 'utf8')).version;
    run(cordova, ['platform', 'add', `${platform}@${platformVersion}`, '--nosave'], local);
  }
  if (!existsSync(resolve(local, 'plugins/de.christiansteinert.dailyversesplugin'))) {
    const plugin = resolve(root, 'src/phonegap-plugin/DailyVersesPlugin');
    run(cordova, ['plugin', 'add', plugin, '--link', '--nosave'], local);
  }
  prepare();
}

if (action === 'web') {
  const output = resolve(root, 'app/shantideva-web');
  assets(output, false);
  writeFileSync(resolve(output, 'cordova.js'), '// Browser build: no native bridge.\n');
  console.log(`Web build: ${output}`);
} else if (action === 'serve') {
  const publicRoot = resolve(root, 'src/web');
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  };
  createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname === '/cordova.js') {
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        return response.end('// Local browser mode');
      }
      const path = resolve(publicRoot, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!path.startsWith(publicRoot + sep)) {
        response.writeHead(403);
        return response.end();
      }
      let content = readFileSync(path);
      if (extname(path) === '.html') {
        content = content.toString().replace(
          '<head>',
          '<head>\n<script>window.SHANTIDEVA_LOCAL_DEV = true;</script>',
        );
      }
      response.writeHead(200, {
        'Content-Type': contentTypes[extname(path)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      response.end(content);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  }).listen(Number(process.env.PORT || 4173), '127.0.0.1', () => {
    console.log(`Local app: http://127.0.0.1:${process.env.PORT || 4173} (cloud disabled)`);
  });
} else if (action === 'setup') setup();
else if (['build', 'run'].includes(action)) {
  prepare();
  if (platform === 'ios') {
    const folder = resolve(local, 'platforms/ios');
    const workspace = readdirSync(folder).find(file => file.endsWith('.xcworkspace'));
    const derived = resolve(root, '.local/derived-data');
    run('xcodebuild', [
      '-workspace', resolve(folder, workspace),
      '-scheme', 'Shantideva Dev',
      '-configuration', 'Debug',
      '-sdk', 'iphonesimulator',
      '-destination', 'generic/platform=iOS Simulator',
      '-derivedDataPath', derived,
      'CODE_SIGN_IDENTITY=-',
      'CODE_SIGNING_ALLOWED=YES',
      'build',
    ]);
    if (action === 'run') {
      const result = spawnSync(
        'xcrun',
        ['simctl', 'list', 'devices', 'available', '--json'],
        { encoding: 'utf8' },
      );
      if (result.status) throw new Error(result.stderr);
      const devices = JSON.parse(result.stdout).devices;
      const runtimes = Object.keys(devices)
        .filter(key => key.includes('.iOS-'))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      const phones = runtimes.flatMap(key => devices[key].filter(device => device.name.startsWith('iPhone')));
      const requested = process.env.IOS_SIMULATOR_ID;
      const requestedDevice = Object.values(devices)
        .flat()
        .find(device => device.udid === requested);
      const device = requested
        ? requestedDevice
        : phones.find(device => device.state === 'Booted') || phones[0];
      if (!device) throw new Error('Install an iOS Simulator in Xcode Settings > Components, or check IOS_SIMULATOR_ID.');
      if (device.state !== 'Booted') run('xcrun', ['simctl', 'boot', device.udid]);
      run('xcrun', ['simctl', 'bootstatus', device.udid, '-b']);
      const application = resolve(
        derived,
        'Build/Products/Debug-iphonesimulator/Shantideva Dev.app',
      );
      run('xcrun', ['simctl', 'install', device.udid, application]);
      run('xcrun', [
        'simctl',
        'launch',
        device.udid,
        'de.christiansteinert.shantidevaverses.dev',
      ]);
      run('open', ['-a', 'Simulator', '--args', '-CurrentDeviceUDID', device.udid]);
      console.log(`Running on ${device.name} (${device.udid})`);
    }
  } else run(cordova, [action, platform, '--debug', ...args], local);
} else if (action === 'open') {
  prepare();
  const folder = resolve(local, 'platforms/ios');
  const workspace = readdirSync(folder).find(file => file.endsWith('.xcworkspace'));
  run('open', [resolve(folder, workspace)]);
} else if (action === 'doctor') {
  const diagnostics = [
    ['node', ['--version']],
    ['xcodebuild', ['-version']],
    ['xcrun', ['simctl', 'list', 'devices', 'available']],
    ['pod', ['--version']],
    ['java', ['-version']],
    ['gradle', ['--version']],
  ];
  for (const [command, argv] of diagnostics) {
    console.log(`\n${command} ${argv.join(' ')}`);
    const result = spawnSync(command, argv, { stdio: 'inherit' });
    if (result.error || result.status) console.log('Unavailable; see docs/DEVELOPMENT.md.');
  }
} else throw new Error(`Unknown action: ${action}`);
