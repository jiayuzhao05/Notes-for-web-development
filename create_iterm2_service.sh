#!/bin/bash

# 创建 iTerm2 Finder 服务的脚本

SERVICE_NAME="New iTerm2 Window Here"
SERVICE_DIR="$HOME/Library/Services"
WORKFLOW_PATH="$SERVICE_DIR/${SERVICE_NAME}.workflow"

# 创建 Services 目录（如果不存在）
mkdir -p "$SERVICE_DIR"

# 创建 workflow 目录
mkdir -p "$WORKFLOW_PATH/Contents"

# 创建 Info.plist
cat > "$WORKFLOW_PATH/Contents/Info.plist" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSServices</key>
    <array>
        <dict>
            <key>NSMenuItem</key>
            <dict>
                <key>default</key>
                <string>New iTerm2 Window Here</string>
            </dict>
            <key>NSMessage</key>
            <string>runWorkflowAsService</string>
            <key>NSRequiredContext</key>
            <dict>
                <key>NSApplicationIdentifier</key>
                <string>com.apple.finder</string>
            </dict>
            <key>NSSendFile</key>
            <true/>
        </dict>
    </array>
</dict>
</plist>
EOF

# 创建 document.wflow（Automator workflow）
cat > "$WORKFLOW_PATH/Contents/document.wflow" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>AMApplicationBuild</key>
    <string>510</string>
    <key>AMApplicationVersion</key>
    <string>2.10</string>
    <key>AMDocumentVersion</key>
    <string>2</string>
    <key>actions</key>
    <array>
        <dict>
            <key>action</key>
            <dict>
                <key>AMAccepts</key>
                <dict>
                    <key>Container</key>
                    <string>List</string>
                    <key>Optional</key>
                    <true/>
                    <key>Types</key>
                    <array>
                        <string>com.apple.cocoa.path</string>
                    </array>
                </dict>
                <key>AMActionVersion</key>
                <string>2.0.3</string>
                <key>AMApplication</key>
                <array>
                    <string>Automator</string>
                </array>
                <key>AMParameterProperties</key>
                <dict>
                    <key>COMMAND_STRING</key>
                    <dict>
                        <key>COMMAND_STRING</key>
                        <string>cd "$1" && open -a iTerm</string>
                    </dict>
                </dict>
                <key>AMProvides</key>
                <dict>
                    <key>Container</key>
                    <string>List</string>
                    <key>Types</key>
                    <array>
                        <string>com.apple.cocoa.path</string>
                    </array>
                </dict>
                <key>ActionBundlePath</key>
                <string>/System/Library/Automator/Run Shell Script.action</string>
                <key>ActionName</key>
                <string>Run Shell Script</string>
                <key>ActionParameters</key>
                <dict>
                    <key>COMMAND_STRING</key>
                    <string>cd "$1" && open -a iTerm</string>
                    <key>CheckedForUserDefaultShell</key>
                    <true/>
                    <key>Shell</key>
                    <string>/bin/zsh</string>
                    <key>source</key>
                    <string>AMShellScriptAction</string>
                </dict>
                <key>BundleIdentifier</key>
                <string>com.apple.RunShellScript</string>
                <key>CFBundleVersion</key>
                <string>2.0.3</string>
                <key>CanShowSelectedItemsWhenRun</key>
                <false/>
                <key>CanShowWhenRun</key>
                <true/>
                <key>Category</key>
                <array>
                    <string>AMCategoryUtilities</string>
                </array>
                <key>Class Name</key>
                <string>RunShellScriptAction</string>
                <key>InputUUID</key>
                <string>CEB8A8E2-6BBE-4C6D-9B3E-8F5A7C8D9E0F</string>
                <key>Keywords</key>
                <array>
                    <string>Shell</string>
                    <string>Script</string>
                    <string>Command</string>
                    <string>Run</string>
                    <string>Execute</string>
                </array>
                <key>OutputUUID</key>
                <string>D1C2B3A4-5E6F-7A8B-9C0D-1E2F3A4B5C6D</string>
                <key>UUID</key>
                <string>B1A2C3D4-E5F6-7A8B-9C0D-1E2F3A4B5C6D</string>
                <key>UnlocalizedApplications</key>
                <array>
                    <string>Automator</string>
                </array>
                <key>arguments</key>
                <dict>
                    <key>0</key>
                    <dict>
                        <key>default value</key>
                        <integer>0</integer>
                        <key>name</key>
                        <string>inputMethod</string>
                        <key>required</key>
                        <string>0</string>
                        <key>type</key>
                        <string>0</string>
                        <key>uuid</key>
                        <string>0</string>
                    </dict>
                    <key>1</key>
                    <dict>
                        <key>default value</key>
                        <string></string>
                        <key>name</key>
                        <string>COMMAND_STRING</string>
                        <key>required</key>
                        <string>0</string>
                        <key>type</key>
                        <string>0</string>
                        <key>uuid</key>
                        <string>1</string>
                    </dict>
                </dict>
                <key>conversionLabel</key>
                <integer>0</integer>
                <key>isViewVisible</key>
                <integer>1</integer>
                <key>location</key>
                <string>578.000000:144.000000</string>
                <key>nestedActions</key>
                <array/>
            </dict>
            <key>isViewVisible</key>
            <integer>1</integer>
        </dict>
    </array>
    <key>connectors</key>
    <dict/>
    <key>workflowMetaData</key>
    <dict>
        <key>serviceInputTypeIdentifier</key>
        <string>com.apple.cocoa.path</string>
        <key>serviceOutputTypeIdentifier</key>
        <string>public.data</string>
        <key>serviceApplicationBundleID</key>
        <string>com.apple.finder</string>
        <key>serviceApplicationPath</key>
        <string>/System/Library/CoreServices/Finder.app</string>
        <key>serviceInputTypeDefaultData</key>
        <string></string>
        <key>serviceOutputTypeDefaultData</key>
        <string></string>
        <key>serviceDescription</key>
        <string>Opens a new iTerm2 window in the selected folder</string>
        <key>serviceKeywords</key>
        <array>
            <string>terminal</string>
            <string>iterm</string>
            <string>iterm2</string>
        </array>
        <key>serviceNestedWorkflowTypeIdentifier</key>
        <string>com.apple.Automator.servicesMenu</string>
        <key>serviceBundleExecutable</key>
        <string></string>
        <key>serviceBundleIdentifier</key>
        <string>com.apple.Automator.servicesMenu</string>
        <key>serviceBundlePath</key>
        <string></string>
        <key>serviceCategory</key>
        <string>0</string>
        <key>serviceClass</key>
        <string>0</string>
        <key>serviceInputTypeConformsTo</key>
        <array>
            <string>public.data</string>
        </array>
        <key>serviceOutputTypeConformsTo</key>
        <array>
            <string>public.data</string>
        </array>
        <key>serviceSubCategory</key>
        <string>0</string>
        <key>serviceUserDefinedWorkflowTypeIdentifier</key>
        <string>com.apple.Automator.servicesMenu</string>
        <key>workflowTypeIdentifier</key>
        <string>com.apple.Automator.servicesMenu</string>
    </dict>
</dict>
</plist>
EOF

echo "✅ iTerm2 Finder 服务已创建！"
echo ""
echo "📋 下一步操作："
echo "1. 打开系统设置 → 键盘 → 快捷键 → 服务"
echo "2. 在 '文件和文件夹' 部分找到 'New iTerm2 Window Here'"
echo "3. 勾选启用该服务"
echo ""
echo "或者运行以下命令打开设置："
echo "   open \"x-apple.systempreferences:com.apple.preference.keyboard?Services\""

