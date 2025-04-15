"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="mb-8 flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Cookie政策</h1>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-gray-500 dark:text-gray-400">
              最后更新日期：{new Date().toISOString().split('T')[0]}
            </p>
            
            <h2>1. 什么是Cookie？</h2>
            <p>
              Cookie是放置在您的设备上的小型文本文件，用于记录与您在我们网站上的活动相关的信息。
              它们帮助我们识别您和您的偏好，从而为您提供更好的使用体验。
              除了Cookie，我们还可能使用网络信标、像素标签或其他类似技术。在本政策中，我们统称这些技术为"Cookie"。
            </p>
            
            <h2>2. 我们如何使用Cookie</h2>
            <p>ToolHub使用Cookie和类似技术出于以下目的：</p>
            <ul>
              <li>
                <strong>必要的Cookie：</strong>
                这些Cookie对于网站的运行至关重要，使您能够在我们的网站上移动并使用其功能。例如，它们支持用户登录和验证、防止欺诈等。没有这些Cookie，您请求的服务无法提供。
              </li>
              <li>
                <strong>偏好Cookie：</strong>
                这些Cookie允许我们记住您的选择，为您提供更加个性化的体验。例如，它们可以记住您的语言偏好、您上次使用的设置等。
              </li>
              <li>
                <strong>统计Cookie：</strong>
                这些Cookie收集有关访问者如何使用网站的信息，例如访问者访问的页面和他们点击的链接。这些信息帮助我们了解用户如何与我们的网站互动，使我们能够改进网站的功能和内容。
              </li>
              <li>
                <strong>营销Cookie：</strong>
                这些Cookie用于跟踪访问者在我们的网站上的浏览习惯。目的是显示与个人用户相关且吸引人的广告，从而使其对用户和发布商更有价值。
              </li>
            </ul>
            
            <h2>3. 我们使用的Cookie类型</h2>
            <p>以下是我们网站上使用的主要Cookie类型：</p>
            
            <Table className="mt-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Cookie名称</TableHead>
                  <TableHead>提供者</TableHead>
                  <TableHead>目的</TableHead>
                  <TableHead>有效期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>auth_token</TableCell>
                  <TableCell>ToolHub</TableCell>
                  <TableCell>验证用户登录状态</TableCell>
                  <TableCell>1个月</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>preferences</TableCell>
                  <TableCell>ToolHub</TableCell>
                  <TableCell>存储用户网站偏好（如深色/浅色模式）</TableCell>
                  <TableCell>1年</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>_ga</TableCell>
                  <TableCell>Google Analytics</TableCell>
                  <TableCell>用于区分用户</TableCell>
                  <TableCell>2年</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>_gid</TableCell>
                  <TableCell>Google Analytics</TableCell>
                  <TableCell>用于区分用户</TableCell>
                  <TableCell>24小时</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <h2>4. 如何管理Cookie</h2>
            <p>
              大多数网页浏览器默认设置为接受Cookie。如果您希望禁用Cookie或调整您的Cookie设置，可以通过浏览器设置进行更改。
              不同的浏览器有不同的方法，以下是主要浏览器的操作指南：
            </p>
            <ul>
              <li>
                <strong>Google Chrome：</strong>
                菜单 &gt; 设置 &gt; 显示高级设置 &gt; 隐私 &gt; 内容设置 &gt; Cookie
              </li>
              <li>
                <strong>Mozilla Firefox：</strong>
                菜单 &gt; 选项 &gt; 隐私 &gt; 历史记录 &gt; 使用自定义设置 &gt; Cookie
              </li>
              <li>
                <strong>Safari：</strong>
                偏好设置 &gt; 隐私
              </li>
              <li>
                <strong>Microsoft Edge：</strong>
                更多(...) &gt; 设置 &gt; Cookie和网站权限
              </li>
            </ul>
            <p>
              请注意，禁用某些Cookie可能会影响我们网站的功能，使您无法使用特定功能或服务。
              此外，拒绝Cookie可能不会阻止您看到在线广告，但这些广告将不再基于您的兴趣和偏好。
            </p>
            
            <h2>5. 第三方Cookie</h2>
            <p>
              我们的网站上有一些Cookie是由第三方设置的，如分析服务提供商和社交媒体平台。
              我们无法控制这些第三方如何使用Cookie。
              我们建议您查看这些第三方的隐私政策，了解他们如何使用Cookie：
            </p>
            <ul>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google</a></li>
              <li><a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://help.twitter.com/en/rules-and-policies/twitter-cookies" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
            
            <h2>6. 更新我们的Cookie政策</h2>
            <p>
              我们可能会不时更新本Cookie政策，以反映我们使用Cookie的实践变化或出于其他运营、法律或监管原因。
              我们鼓励您定期查看本政策，以了解我们最新的Cookie做法。
              政策修改后，我们将在本页更新"最后更新日期"。
            </p>
            
            <h2>7. Cookie同意</h2>
            <p>
              当您首次访问我们的网站时，我们会要求您同意我们使用Cookie。
              您可以选择接受所有Cookie，或者自定义您的Cookie偏好。
              您可以随时通过点击网站底部的"Cookie设置"链接更改您的Cookie偏好。
            </p>
            
            <h2>8. 联系我们</h2>
            <p>
              如果您对我们的Cookie政策有任何问题或疑虑，请通过以下方式联系我们：
            </p>
            <ul>
              <li>电子邮件：privacy@toolhub.com</li>
              <li>地址：北京市海淀区中关村大街1号，创新大厦10层1001室</li>
            </ul>
          </div>
          
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/">返回首页</Link>
              </Button>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/terms-of-service">服务条款</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/privacy-policy">隐私政策</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 