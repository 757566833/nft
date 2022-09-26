const server = process.env.NEXT_PUBLIC_FILE||''

export const upload = async ()=>{
    const url = `${server}/upload/nft`;
    const res = await fetch(url,{
        method:"POST",
        // for
    })
}
