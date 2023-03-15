# モノ譲りプロジェクト

メンバーの越智のブランチです

投稿機能と商品を一覧で取得してくるところまで実装しました

Mysqlの接続に必要な情報は.envファイルを用いて、隠しています。(gitには上げないように.gitignoreファイルに記述しています)
[.envファイル記述方法参考サイト]https://maku77.github.io/nodejs/env/dotenv.html

**作成途中のテーブル構造例**

*画像用テーブル img_table*

    mono_id INT型 オートインクリメント プライマリキー

    img_path VARCHAR型 長さ200

*ユーザテーブル user*

    student_num VARCHAR型 長さ255