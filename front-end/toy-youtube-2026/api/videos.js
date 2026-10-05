import process from 'node:process';

export async function GET(){
  try{
    const apiKey = process.env.YOUTUBE_API_KEY;
    if(!apiKey) throw new Error('API 키가 없습니다.');
    const params = new URLSearchParams({
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: '25',
      regionCode: 'KR',
      key: apiKey,
    });

    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`);
    if (!response.ok) throw new Error('YouTube 요청 실패');

    const data = await response.json();
    return Response.json({ items: data.items ?? [] });

  }catch{
    return Response.json(
      { error: { message: '영상 요청 실패' } },
      { status: 500 }
    )
  }
}
