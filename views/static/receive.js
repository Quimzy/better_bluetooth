function download(file){
    var link = document.createElement("a")
    var blob = new Blob([file.content], {type: file.filetype});
    link.href = URL.createObjectURL(blob);
    link.download = file.filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

document.addEventListener('DOMContentLoaded', event => {
	const peer = new Peer('receiver', {host: location.hostname, port: 9000, key: 'peerjs', path: '/peerjs'})

	peer.on('connection', conn => {
		console.log(`${conn.peer} connected`)
		conn.on('data', data => {
			if (confirm(`Do you want to download ${data.filename} from ${conn.peer} ?`)){	
				download(data);
			}
		})
	})
})
