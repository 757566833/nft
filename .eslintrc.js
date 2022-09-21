module.exports = {
    'extends': [
      "next/core-web-vitals",
    ],
    // "plugins": [
    //     "react-hooks"
    // ],
    "rules": {
        // ...
        "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
        "react-hooks/exhaustive-deps": "error", // 检查 effect 的依赖
        "linebreak-style":"off"

    }
  };