#!/usr/bin/env node

// iOS Workaround: set CODE_SIGNING_ALLOWED to NO to avoid signing errors during CI Builds
// This is based on https://github.com/dpa99c/cordova-plugin-firebasex/issues/766

const fs = require("fs");
const path = require("path");
const execa = require("execa");

module.exports = (context) => {
  const platformPath = path.resolve(context.opts.projectRoot, "platforms/ios");
  const podfilePath = path.resolve(platformPath, "Podfile");

  if (!fs.existsSync(podfilePath)) {
    console.log(`'${podfilePath}' does not exist. iOS deployment fix skipped.`);
    return;
  } else {
    console.log(`iOS fix active. Setting CODE_SIGNING_ALLOWED=NO in '${podfilePath}'.`);
  }

  let podfileContent = fs.readFileSync(podfilePath, "utf-8");
  if (podfileContent.indexOf("post_install") == -1) {
/*

  installer.generated_projects.each do |project|
    project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['DEVELOPMENT_TEAM'] = '5LRG26P7CX'
        config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""
        config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"    
        config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end
*/

    podfileContent += `

post_install do |installer|
  installer.pods_project.targets.each do |target|  
    # Workaround https://github.com/flutter/flutter/issues/111475.
    target_is_resource_bundle = target.respond_to?(:product_type) && target.product_type == 'com.apple.product-type.bundle'
    target.build_configurations.each do |build_configuration|
      if target_is_resource_bundle
        build_configuration.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
        build_configuration.build_settings['CODE_SIGNING_REQUIRED'] = 'NO'
        build_configuration.build_settings['CODE_SIGNING_IDENTITY'] = '-'
        build_configuration.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = '-'
      end
    end
  end
end

`;

    fs.writeFileSync(podfilePath, podfileContent, "utf-8");
    console.log("pod file content:");
    console.log(podfileContent);

    return execa("pod", ["install", "--verbose"], {
      cwd: platformPath,
    });
  }
};