module.exports = {
  apps: [
    {
      // ─── 基本 ───
      name: 'tweetcord',                 // pm2 list 顯示的名稱
      script: 'bot.py',                  // 要執行的腳本
      interpreter: './venv/bin/python',  // 用 venv 裡的 Python(相對於 cwd)
      cwd: '/var/www/html/svwb/tweetcord',  // 工作目錄,Ubuntu 上改成如 /home/loslight1994/Tweetcord

      // ─── 重啟策略 ───
      autorestart: true,        // 崩潰自動重啟
      restart_delay: 5000,      // 每次重啟前等 5 秒
      max_restarts: 10,         // 短時間內連續崩潰上限,超過就放棄(避免無限重啟)
      min_uptime: '30s',        // 跑滿 30 秒才算「成功啟動」,否則計入連續崩潰次數
      stop_exit_codes: [0],     // 正常結束(exit 0)不重啟

      // ─── 資源保護 ───
      max_memory_restart: '300M',  // 記憶體超過 300MB 自動重啟(防記憶體洩漏)

      // ─── 環境變數 ───
      env: {
        PYTHONUNBUFFERED: '1',   // 關閉 Python 輸出緩衝,日誌即時顯示
      },

      // ─── 日誌 ───
      out_file: './logs/pm2-out.log',    // stdout 寫到這
      error_file: './logs/pm2-error.log', // stderr 寫到這
      merge_logs: true,                   // 同名程序日誌合併
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 每行加時間戳
      time: true,

      // ─── Python 專案不需要的功能,明確關閉 ───
      watch: false,        // 不要監聽檔案變動自動重啟(bot 會寫資料庫,開了會一直重啟!)
      instances: 1,        // 只跑一份(cluster 模式是 Node 專用,Python 不能用)
      exec_mode: 'fork',   // Python 一律用 fork 模式
    },
  ],
};