# AR
### 事前準備
* 辨識圖

    將原圖上傳至 https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html ，Pattern ratio及Image size以預設為主即可，之後請下載marker及image放至**src/marker/**

    **\* 請確認各題號圖片之間不會產生誤判**

* 模型

    由於ar.js直接顯示obj + mtl似乎有問題，故請先**合併轉換為gltf或是glb檔案**，轉換gltf / glb可以使用
    \
        1. [obj2gltf](https://github.com/CesiumGS/obj2gltf) \
        2. Windows的3D Viewer \
        3. 或其他線上工具

    之後將模型檔案放至**src/model/**


### 環境安裝
```
npm install
```

### 使用Webpack打包所有靜態檔案，可以以下面2種方式打包
* 本地測試 (watch)
    ```
    npm run dev
    ```

* 正式部屬
    ```
    npm run prod
    ```
    2種方式都會將**src/**的所有檔案，打包並處理好關聯性，存於**docs/**

### local運行方式
1. **確認IP**，修改app.js
2. 由於需使用鏡頭，網站必須以 **https** 方式運行，所以需要先產生金鑰與憑證並放至**cert/**
3. 執行
    ```
    node app.js
    ```
    或 (需安裝nodemon)
    ```
    nodemon app.js
    ```
4. 打開https://[IP]/bio.html 或 https://[IP]/iot.html

## TODO
* 所有關於辨識圖、模型，以及題目、選項，需要修改的地方都已標註在**src/bio.html**中，可以搜尋 ```需修改!!!```
* 學生的紀錄 (包含姓名、學號、填寫答案和正確答案)，已存成object格式，在**src/index.js**中146行function內的 `toReturn` 變數，格式：
    ```
    {
        "name": 學生姓名,
        "id": 學生學號,
        "ans": [
            {   
                <!-- 第1題 -->
                <!-- 正確答案和學生答題格式都為[1,2,3]，此即為[A,B,C] -->
                "correct": 正確答案,
                "answer": 學生答題
            },
            {
                <!-- 第2題 -->
                "correct": 正確答案,
                "answer": 學生答題
            },
            {
                <!-- 第3題 -->
                "correct": 正確答案,
                "answer": 學生答題
            },
            ...以此類推
        ]
    }
    ```
    在164行後 `toReturn` 就會是最後且完整的記錄了；學生按下提交按鈕後，手機網頁會跳出作答紀錄頁面，另外同時也要將 `toReturn` 傳出