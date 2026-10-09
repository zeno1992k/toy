import process from 'node:process';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const keyword = (url.searchParams.get('q') ?? '').trim();
    const videoId = (url.searchParams.get('id') ?? '').trim();

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      throw new Error('API 키가 없습니다.');
    }

    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: '25',
      regionCode: 'KR',
      key: apiKey,
    });

    let endpoint = 'videos';

    if (videoId !== '') {
      params.set('id', videoId);
    } else if (keyword !== '') {
      endpoint = 'search';
      params.set('q', keyword);
      params.set('type', 'video');
    } else {
      params.set('chart', 'mostPopular');
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/${endpoint}?${params}`
    );

    if (!response.ok) {
      throw new Error('YouTube 요청 실패');
    }

    const data = await response.json();
    let items = data.items ?? [];

    if (videoId === '' && keyword !== '') {
      items = items.map((video) => ({
        id: video.id.videoId,
        snippet: video.snippet,
      }));
    }

    return Response.json({ items: items });
  } catch {
    return Response.json(
      { error: { message: '영상 요청 실패' } },
      { status: 500 }
    );
  }
}