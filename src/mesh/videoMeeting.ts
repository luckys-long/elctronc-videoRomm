
export default class VideoMeeting {

    public async getStream(): Promise<MediaStream> {
        try {
            // https://blog.csdn.net/keith837/article/details/44818841
            const streamConstraints = {
                audio: false,
                
                video: {
                    //todo 到时候会选择接听频道 deviceId: $('#video-select').val(),
                        frameRate: { min: 20 },
                        aspectRatio: 16 / 9,
                        facingMode: "environment", // user:前置摄像头，environment:后置摄像头
                }
                
            };
            // @ts-ignore
            let videoStream = await navigator.mediaDevices.getUserMedia(streamConstraints);
            console.log(videoStream.getVideoTracks()[0].getSettings());
            return videoStream;
        } catch (error) {
            console.error(error);
            console.dir(error);
            console.error('无法获取摄像头<br>请检查麦克风权限和摄像头！！！');
        }
        throw new Error("获取流失败")
    }
}