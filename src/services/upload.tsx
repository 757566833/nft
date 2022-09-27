const server = process.env.NEXT_PUBLIC_FILE||''

export const upload = async (formData:FormData)=>{
    const url = `${server}/upload/nft`;
    const res = await fetch(url,{
        method:"POST",
        body: formData,
    })
    return await res.json();
}
