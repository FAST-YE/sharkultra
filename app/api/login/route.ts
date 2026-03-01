import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { server, username, password } = await request.json();
    
    // Clean up server URL (remove trailing slash if exists)
    const cleanServer = server.trim().replace(/\/$/, '');
    
    // Xtream Codes API standard endpoint
    const targetUrl = `${cleanServer}/player_api.php?username=${username}&password=${password}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'IPTVSmartersPro', // Some servers require a specific User-Agent
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'فشل الاتصال بالسيرفر. تأكد من الرابط أو البيانات.' },
      { status: 500 }
    );
  }
}
