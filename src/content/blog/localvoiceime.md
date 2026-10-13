---
title: 发布一个离线语音输入法：LocalVoiceIME
description: 一个跑在 Android 本地的离线语音转文字输入法：语音数据不出设备、不需要网络和 API Key，可以配合小企鹅输入法（Fcitx5 Android）使用。附下载与使用说明。
publishDate: 2026-10-07
tags: [Android, 输入法, 语音识别, 开源]
language: 中文
---

折腾了这么久，今天终于可以把这个小东西正式挂出来介绍了——**LocalVoiceIME**，一个跑在手机本地的离线语音转文字输入法。

## 它是什么？

LocalVoiceIME 是一个面向 Android 的**本地语音转文字输入工具**。它用 [SenseVoice](https://github.com/QwenAudio/SenseVoice) + [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) 在设备本地完成语音识别：

> 麦克风 → SenseVoice 本地识别 → 文字直接输入到当前输入框

一句话：**说话，字就出来了，全程不联网。**

它的核心特点：

- 🎙️ 本地语音转文字，语音数据不上传任何服务器
- 🌐 支持中文（含粤语）、英语、日语、韩文等多语言
- 📡 不需要网络、不需要 API Key、不需要买云端额度
- ⌨️ 可以作为独立输入法使用，也可以配合 **Fcitx5 Android（小企鹅输入法）** 一起用

## 怎么用？

### 1. 下载安装

从仓库的 Releases 页面下载 APK（约 266MB，里面打包了语音识别模型）：

**📦 仓库地址：[github.com/selenaflora927-dot/LocalVoiceIME](https://github.com/selenaflora927-dot/LocalVoiceIME)**

直接下载：[LocalVoiceIME-v1.apk](https://github.com/selenaflora927-dot/LocalVoiceIME/releases/download/v1/LocalVoiceIME-v1.apk)

### 2. 启用输入法

安装后打开：

```
设置 → 系统 → 键盘 / 输入法 → 屏幕键盘 → 启用 LocalVoiceIME
```

（不同厂商的菜单名字可能略有差别）

### 3. 开始说话

在任何可以输入文字的地方，切换到 LocalVoiceIME → 点麦克风 → 说话 → 停止，识别结果直接进输入框。

### 配合小企鹅输入法

如果你也在用 Fcitx5 Android，推荐的姿势是：

- 平时打字：**小企鹅**（拼音 / 双拼 / 五笔）
- 要语音输入：切到 **LocalVoiceIME**，说完切回去

两个输入法各干各的，系统输入法切换就能搞定。

## 设备要求

- Android 10+，ARM64 设备
- 需要麦克风权限
- 模型在本地跑，**手机性能越好识别越快**

## 写在最后

这东西的初衷很简单：语音输入不该依赖云端，也不该为了打几个字把录音交出去。本地跑一个 200 多 MB 的模型，换来离线可用和数据不出设备，我觉得值。

完整说明、隐私细节和编译方法都在仓库 README 里：

**📦 [github.com/selenaflora927-dot/LocalVoiceIME](https://github.com/selenaflora927-dot/LocalVoiceIME)**

有问题欢迎提 Issue，也欢迎试用后回来告诉我你的机型表现如何 ✧

---

*小宁 · 霁后初晴*
