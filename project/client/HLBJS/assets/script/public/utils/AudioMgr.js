
var AudioMgr = {};

var bgmVolume = 1.0; 
var effVolume = 1.0; 
var bgmAudioId = null;

AudioMgr.init = function() {
    bgmVolume = gt.getLocal('bgmVolume', 1.0);
    effVolume = gt.getLocal('effVolume', 1.0);
}

/* 播放背景音乐 
** filename:相对于 resources/sound/ 目录的路径, 文件名不包含扩展名
*/
AudioMgr.playMusic = function(filename, isLoop) { 
    this.stopMusic();

    let filepath = 'sound/' + filename;
    cc.loader.loadRes(filepath, cc.AudioClip, function(err, clip) {
        if (err) {
            cc.log('xxx invalid audo file:', filename);
            return 
        }
        bgmAudioId = cc.audioEngine.playMusic(clip, isLoop, bgmVolume);
    });
} 

AudioMgr.stopMusic = function() { 
    if (bgmAudioId != null) {
        cc.audioEngine.stopMusic(bgmAudioId);
        bgmAudioId = null;
    }
}

AudioMgr.setMusicVolume = function(volume) { 
    if (bgmAudioId == null) return;

    cc.audioEngine.setMusicVolume(volume);

    if (bgmVolume != volume) {
        gt.setLocal('bgmVolume', volume);
    }
}





module.exports = AudioMgr; 
