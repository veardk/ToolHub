import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://127.0.0.1:8022';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 转发请求到后端API
    const response = await fetch(`${API_BASE_URL}/api/tool/${id}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 获取后端API的响应
    const data = await response.json();

    // 返回后端响应给前端
    return NextResponse.json(data);
  } catch (error) {
    console.error('转发工具问题报告请求出错:', error);
    
    // 返回服务器错误响应
    return NextResponse.json(
      {
        code: 500,
        message: '服务器错误，请稍后重试',
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 