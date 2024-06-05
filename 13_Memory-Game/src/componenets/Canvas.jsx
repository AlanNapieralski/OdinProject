import Mellstroy from './Mellstroy.jsx'

export default function Canvas() {

    const requireAsset = require.context('../assets', false, /\.(png|jpe?g|svg|gif)$/)
    console.log(requireAsset)

    const gifs = requireAsset.keys().map((key, index) => ({
        id: index + 1,
        name: key.replace('./', '').replace(/\.\w+$/, ''),
        url: requireAsset(key),
    }));

    console.log(gifs)

    for (let i = gifs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [gifs[i], gifs[j]] = [gifs[j], gifs[i]]
    }
    
    return (
        <>
            {gifs.map( gif => {
                <Mellstroy gif={gif} />
            })}
        </>
    )
}