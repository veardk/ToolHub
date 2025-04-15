"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Clock,
  ChevronRight
} from "lucide-react"

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

// 定义表单验证架构
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "姓名至少需要2个字符",
  }),
  email: z.string().email({
    message: "请输入有效的电子邮件地址",
  }),
  subject: z.string().min(4, {
    message: "主题至少需要4个字符",
  }),
  message: z.string().min(10, {
    message: "消息至少需要10个字符",
  }),
})

// 常见问题数据
interface FAQItem {
  question: string;
  answer: string;
}

const FAQCategories = ["平台相关", "工具收录", "账号相关", "内容创作", "商务合作"] as const;
type FAQCategory = typeof FAQCategories[number];

const platformQuestions = [
  {
    question: "什么是ToolHub？",
    answer: "ToolHub是一个专注于工具发现与分享的平台，我们收集并整理各类有用的工具，从AI工具到开发者工具，帮助用户发现最适合自己需求的工具。"
  },
  {
    question: "如何使用ToolHub？",
    answer: "您可以浏览我们的工具库，使用搜索功能查找特定工具，比较不同工具的功能，阅读用户评价，或者提交您发现的新工具。无需注册即可浏览，但注册后可以收藏工具、发表评论和提交工具。"
  },
  {
    question: "ToolHub是免费的吗？",
    answer: "是的，ToolHub平台对所有用户完全免费。我们通过合作伙伴关系和有限的推广内容维持运营，但我们保证这不会影响用户体验和内容质量。"
  }
];

const toolSubmitQuestions = [
  {
    question: "如何提交我的工具？",
    answer: "您可以通过\"提交工具\"页面提交您的工具。您需要提供工具名称、描述、官方网站链接、分类以及其他相关信息。提交后我们的团队会进行审核。"
  },
  {
    question: "工具审核的标准是什么？",
    answer: "我们的审核标准包括工具的实用性、创新性、界面友好度、性能稳定性和安全性等。我们不接受含有恶意软件、违反法律法规或侵犯知识产权的工具。"
  },
  {
    question: "提交工具需要多长时间审核？",
    answer: "通常我们会在3-5个工作日内完成审核。如果您提交的工具被接受，您将收到电子邮件通知，并在平台上看到您的工具。"
  }
];

const accountQuestions = [
  {
    question: "如何注册ToolHub账号？",
    answer: "点击网站右上角的\"注册\"按钮，填写您的电子邮件地址、用户名和密码即可完成注册。您也可以选择使用Google或GitHub账号直接登录。"
  },
  {
    question: "我的个人数据如何被保护？",
    answer: "我们高度重视用户隐私。我们只收集必要的信息用于账号管理和服务改进。您的个人数据受到严格保护，不会被出售给第三方。更多详情请查看我们的隐私政策。"
  },
  {
    question: "如何删除我的账号？",
    answer: "登录后，您可以在\"个人设置\"页面找到\"删除账号\"选项。请注意，账号删除是不可逆的，所有与您账号相关的数据（如收藏的工具、评论等）将被永久删除。"
  }
];

const contentQuestions = [
  {
    question: "如何发布文章到ToolHub？",
    answer: "目前，文章发布功能主要面向我们的合作作者。如果您有兴趣成为ToolHub的内容创作者，请通过联系表单与我们取得联系，说明您的专业领域和写作经验。"
  },
  {
    question: "我可以分享ToolHub的内容吗？",
    answer: "当然可以。我们鼓励用户分享我们的内容，只要注明来源是ToolHub即可。但请不要复制整篇文章到其他平台，最好是分享原文链接。"
  },
  {
    question: "关于版权问题，我需要注意什么？",
    answer: "在ToolHub发布的所有原创内容版权归ToolHub所有。工具描述页面上的信息通常来自官方网站，版权归相应的工具开发者或公司所有。"
  }
];

const businessQuestions = [
  {
    question: "如何与ToolHub进行商务合作？",
    answer: "我们开放多种合作方式，包括工具推广、内容合作、联合活动等。请通过联系表单或直接发送邮件到business@toolhub.com（示例邮箱）与我们的商务团队联系。"
  },
  {
    question: "ToolHub提供广告服务吗？",
    answer: "是的，我们提供有限且高质量的广告位置，确保不会干扰用户体验。我们的广告主主要是与工具相关的服务或产品。如需了解详情，请联系我们的广告团队。"
  },
  {
    question: "如何成为ToolHub的品牌合作伙伴？",
    answer: "我们欢迎与技术公司、教育机构和创新企业建立长期合作关系。成为品牌合作伙伴可以获得专属展示位置、定制内容合作和联合营销活动等权益。请联系我们详细了解。"
  }
];

// 组合所有问题为一个对象
const faqData = {
  "平台相关": platformQuestions,
  "工具收录": toolSubmitQuestions,
  "账号相关": accountQuestions,
  "内容创作": contentQuestions,
  "商务合作": businessQuestions
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<FAQCategory>("平台相关");
  
  // 初始化表单
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 表单提交处理
  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // 在实际应用中，这里会发送数据到后端API
    console.log(values);
    toast.success("您的消息已发送！我们会尽快回复您。");
    form.reset();
  }

  return (
    <div className="min-h-screen">
      {/* 顶部横幅 */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
              <p className="text-xl opacity-90 mb-8">
                ToolHub致力于帮助用户发现、比较和使用最佳工具，提升工作效率与创造力。
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                  <Link href="#contact">联系我们</Link>
                </Button>
                <Button asChild variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                  <Link href="#faq">常见问题</Link>
                </Button>
                <Button asChild variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                  <Link href="/submit-tool">提交工具</Link>
                </Button>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="aspect-video bg-white/10 rounded-lg overflow-hidden">
                {/* 这里可以放置团队照片或工作场景 */}
                <img 
                  src="/placeholder.svg" 
                  alt="ToolHub团队" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 border-none">
                我们的团队
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的使命 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">我们的使命</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              在数字工具爆炸式增长的时代，找到最适合自己需求的工具变得越来越困难。
              ToolHub的使命是通过精心策划的工具集合、详细的比较和真实的用户评价，
              帮助每个人更快地找到最适合自己的工具，节省时间并提高工作效率。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">发现</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  帮助用户发现最新、最实用的工具，无论是AI工具、网页工具、应用工具还是开发者工具。
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">比较</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  提供详细的功能对比和用户评价，帮助用户在众多选择中找到最适合自己需求的工具。
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">赋能</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  通过详细的使用指南、教程和最佳实践，帮助用户充分发挥每个工具的潜力。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
          
          <div className="max-w-4xl mx-auto">
            <Tabs 
              defaultValue="平台相关" 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as FAQCategory)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                {Object.keys(faqData).map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="text-sm md:text-base py-2"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {Object.entries(faqData).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="pt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-700 dark:text-gray-300">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">联系我们</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 联系表单 */}
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入您的姓名" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>电子邮件</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入您的电子邮件" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>主题</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入消息主题" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>消息内容</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="请详细描述您的问题或建议" 
                            className="min-h-[150px]" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">发送消息</Button>
                </form>
              </Form>
            </div>
            
            {/* 联系信息 */}
            <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-semibold mb-6">联系方式</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mt-0.5 mr-3 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="font-medium mb-1">电子邮件</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="mailto:contact@toolhub.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                        contact@toolhub.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mt-0.5 mr-3 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="font-medium mb-1">办公地址</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      北京市海淀区中关村大街1号<br />
                      创新大厦10层1001室
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mt-0.5 mr-3 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="font-medium mb-1">工作时间</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      周一至周五: 9:00 - 18:00<br />
                      周末与节假日休息
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">关注我们</h4>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 免责声明和条款 */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">免责声明与条款</h3>
            
            <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                ToolHub平台提供的工具信息仅供参考，我们不为这些工具的功能、性能或安全性提供任何形式的保证。用户在使用任何工具前应自行评估其适用性和风险。
              </p>
              <p>
                ToolHub平台上的部分链接可能是附属链接，这意味着我们可能从您通过这些链接进行的购买中获得佣金，但这不会影响我们对工具的客观评价。
              </p>
              <p>
                使用ToolHub平台即表示您同意遵守我们的服务条款和隐私政策。我们保留随时更改这些条款的权利，更改将在发布后立即生效。
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button asChild variant="outline" className="flex items-center">
                  <Link href="/terms-of-service">
                    服务条款
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex items-center">
                  <Link href="/privacy-policy">
                    隐私政策
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex items-center">
                  <Link href="/cookie-policy">
                    Cookie政策
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <p className="text-center mt-8">
                © {new Date().getFullYear()} ToolHub. 保留所有权利。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 