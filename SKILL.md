{
  "name": "AI律师标准技能包",
  "version": "1.0.0",
  "type": "bundle",
  "description": "AI律师团队协作全球标准v1.8完整技能包，包含评估、实施、培训、合规、ROI计算5个核心技能",
  "author": "阿拉丁",
  "guidance": "张海洋",
  "standard": "AI律师团队协作全球标准 v1.8",
  
  "overview": {
    "title": "AI律师标准技能包",
    "summary": "为AI律师团队协作全球标准和AI法务团队协作全球标准v1.8提供完整的自动化支持，包括客户评估、实施导航、培训生成、合规检查、ROI计算5个核心技能",
    "features": [
      "自动评估客户适配度（25个评估问题，5个维度）",
      "生成实施路径（3种组织类型，5个阶段）",
      "自动生成培训课程（3种课程类型）",
      "检查法律合规性（20+合规要求项）",
      "计算投资回报率（3种基准数据）"
    ],
    "capabilities": [
      "快速评估（<1分钟生成报告）",
      "自动导航（30秒生成路径）",
      "多格式输出（JSON/Markdown）",
      "智能建议（自动优化建议）"
    ]
  },
  
  "skills": [
    {
      "name": "标准自动化评估系统",
      "file": "standard-assessment/evaluate.js",
      "description": "自动评估律所/企业对AI标准的适配度，生成详细评估报告",
      "version": "1.0.0",
      "inputs": [
        "评估问卷答案（25个问题）",
        "用户基本信息"
      ],
      "outputs": [
        "综合评分（0-100分）",
        "适配等级（高适配/中高适配/中适配/中低适配/低适配）",
        "详细评估报告（JSON/Markdown）"
      ]
    },
    {
      "name": "标准实施导航系统",
      "file": "standard-implementation/navigation.js",
      "description": "生成5阶段实施路径，含任务分解和风险管理",
      "version": "1.0.0",
      "inputs": [
        "组织类型（small/medium/large）",
        "自定义配置"
      ],
      "outputs": [
        "实施计划（时间线+里程碑）",
        "任务分解（16-20个任务）",
        "风险管理（风险识别+缓解措施）",
        "进度跟踪"
      ]
    },
    {
      "name": "标准培训自动化生成器",
      "file": "training-generator/course-generator.js",
      "description": "自动生成培训课程、PPT大纲、练习题库、证书模板",
      "version": "1.0.0",
      "inputs": [
        "评估结果（评估报告）",
        "课程类型（basic/advanced/manager）"
      ],
      "outputs": [
        "课程大纲",
        "PPT大纲",
        "练习题库",
        "证书模板",
        "培训资源"
      ]
    },
    {
      "name": "标准合规检查器",
      "file": "compliance-checker/compliance-checker.js",
      "description": "检查《网络安全法》《个人信息保护法》《律师法》等法规合规性",
      "version": "1.0.0",
      "inputs": [
        "系统信息（security/privacy/legal/ai）",
        "检查选项（是否包含GDPR）"
      ],
      "outputs": [
        "合规评分（0-100分）",
        "合规等级（完全合规/基本合规/部分合规/不合规）",
        "合规报告（JSON/Markdown）",
        "改进建议"
      ]
    },
    {
      "name": "标准ROI计算器",
      "file": "roi-calculator/roi-calculator.js",
      "description": "自动计算投资回报率、回本期、利润率",
      "version": "1.0.0",
      "inputs": [
        "用户数据（团队规模、时薪、收入等）",
        "实施成本",
        "时间框架"
      ],
      "outputs": [
        "投资回报率（%）",
        "回本期（月）",
        "利润率（%）",
        "ROI报告（JSON/Markdown）",
        "财务预测（12个月）"
      ]
    }
  ],
  
  "tags": [
    "ai-legal",
    "standard",
    "assessment",
    "implementation",
    "training",
    "compliance",
    "roi",
    "automation",
    "government",
    "legal"
  ],
  
  "license": "MIT",
  "contact": {
    "developer": "阿拉丁",
    "guidance": "张海洋",
    "organization": "法律AI团队",
    "email": "aladdin@legal-ai-team.com",
    "github": "https://github.com/legal-ai-team/ai-legal-standard-skills"
  },
  
  "support": {
    "documentation": "https://github.com/legal-ai-team/ai-legal-standard-skills/blob/main/README.md",
    "issues": "https://github.com/legal-ai-team/ai-legal-standard-skills/issues",
    "discussion": "https://github.com/legal-legal-ai-team/ai-legal-standard-skills/discussions",
    "changelog": "https://github.com/legal-ai-team/ai-legal-standard-skills/blob/main/CHANGELOG.md"
  }
}