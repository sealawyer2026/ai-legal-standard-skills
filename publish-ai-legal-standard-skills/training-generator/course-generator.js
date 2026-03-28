/**
 * 标准培训自动化生成器
 * AI律师团队协作全球标准 v1.8
 * AI法务团队协作全球标准 v1.8
 */

const fs = require('fs-extra');
const path = require('path');

class TrainingCourseGenerator {
    constructor() {
        this.standardVersion = 'v1.8';
        this.courseTemplates = this.loadCourseTemplates();
    }

    /**
     * 加载课程模板
     */
    loadCourseTemplates() {
        return {
            // 基础培训课程
            basic: {
                title: 'AI律师标准基础培训',
                duration: '2天',
                objectives: [
                    '理解AI标准的核心价值',
                    '掌握基础操作方法',
                    '了解标准实施流程'
                ],
                modules: [
                    {
                        id: 'm1',
                        title: '模块1：标准概述',
                        duration: '0.5天',
                        content: [
                            'AI标准的发展历程',
                            'v1.8标准的核心内容',
                            '实施AI标准的意义'
                        ],
                        activities: [
                            '讲解标准框架',
                            '案例分享',
                            '小组讨论'
                        ]
                    },
                    {
                        id: 'm2',
                        title: '模块2：基础操作',
                        duration: '0.5天',
                        content: [
                            '系统基本操作',
                            '常用功能介绍',
                            '快捷键和技巧'
                        ],
                        activities: [
                            '系统演示',
                            '实际操作练习',
                            '问答环节'
                        ]
                    },
                    {
                        id: 'm3',
                        title: '模块3：实践练习',
                        duration: '1天',
                        content: [
                            '案例实战操作',
                            '团队协作模拟',
                            '问题排查'
                        ],
                        activities: [
                            '分组练习',
                            '成果展示',
                            '点评指导'
                        ]
                    }
                ],
                exercises: [
                    {
                        id: 'e1',
                        title: '基础操作测试',
                        type: '选择题',
                        questions: [
                            {
                                q: 'AI标准的核心价值是什么？',
                                options: [
                                    '降低成本',
                                    '提升效率',
                                    '提高准确率',
                                    '以上都是'
                                ],
                                correct: 'd'
                            },
                            {
                                q: '标准实施的第一阶段是什么？',
                                options: [
                                    '启动准备',
                                    '基础设施',
                                    '知识库建设',
                                    '试点运行'
                                ],
                                correct: 'a'
                            }
                        ]
                    },
                    {
                        id: 'e2',
                        title: '实战案例分析',
                        type: '情景题',
                        scenario: '某律所实施AI标准后，成本降低了30%，效率提升了40%，请问：这是否达到了预期目标？',
                        correct: 'y',
                        analysis: '根据标准目标，成本降低目标是30-40%，效率提升目标是40-50%，基本达到预期'
                    }
                ]
            },

            // 进阶培训课程
            advanced: {
                title: 'AI律师标准进阶培训',
                duration: '3天',
                prerequisites: ['完成基础培训'],
                objectives: [
                    '掌握高级功能',
                    '优化工作流程',
                    '提升团队效能'
                ],
                modules: [
                    {
                        id: 'm1',
                        title: '模块1：高级功能',
                        duration: '1天',
                        content: [
                            '智能推荐功能',
                            '自动化工作流',
                            '数据分析工具'
                        ],
                        activities: [
                            '深度讲解',
                            '案例研究',
                            '实战演练'
                        ]
                    },
                    {
                        id: 'm2',
                        title: '模块2：流程优化',
                        duration: '1天',
                        content: [
                            '工作流分析',
                            '流程设计方法',
                            '效果评估'
                        ],
                        activities: [
                            '流程绘制',
                            '小组讨论',
                            '方案设计'
                        ]
                    },
                    {
                        id: 'm3',
                        title: '模块3：效能提升',
                        duration: '1天',
                        content: [
                            '效率优化方法',
                            '质量提升技巧',
                            '持续改进机制'
                        ],
                        activities: [
                            '方法讲解',
                        - '实践练习',
                            '经验分享'
                        ]
                    }
                ],
                exercises: [
                    {
                        id: 'e1',
                        title: '高级功能测试',
                        type: '操作题',
                        task: '使用智能推荐功能为一组3个案例推荐最合适的解决方案',
                        criteria: [
                            '正确使用推荐功能',
                            '推荐结果合理',
                            '时间控制'
                        ]
                    }
                ]
            },

            // 管理员培训课程
            manager: {
                title: 'AI律师标准管理员培训',
                duration: '2天',
                objectives: [
                    '系统管理能力',
                    '团队管理能力',
                    '效果评估能力'
                ],
                modules: [
                    {
                        id: 'm1',
                        title: '模块1：系统管理',
                        duration: '0.5天',
                        content: [
                            '系统配置',
                            '用户权限管理',
                            '数据安全管理'
                        ],
                        activities: [
                            '管理后台演示',
                            '权限配置练习',
                            '安全策略制定'
                        ]
                    },
                    {
                        id: 'm2',
                        title: '模块2：团队管理',
                        duration: '0.5天',
                        content: [
                            '团队结构设计',
                            '角色权限分配',
                            '绩效管理'
                        ],
                        activities: [
                            '组织架构演练',
                            '权限分配练习',
                            '绩效考核设计'
                        ]
                    },
                    {
                        id: 'm3',
                        title: '模块3：效果评估',
                        duration: '1天',
                        content: [
                            '数据监控',
                            '效果分析',
                            '优化建议'
                        ],
                        activities: [
                            '仪表板使用',
                            '案例分析',
                            '改进计划'
                        ]
                    }
                ],
                exercises: [
                    {
                        id: 'e1',
                        title: '管理后台测试',
                        type: '综合题',
                        tasks: [
                            '创建一个3人的团队',
                            '分配不同权限',
                            '生成月度绩效报告'
                        ]
                    }
                ]
            }
        };
    }

    /**
     * 根据评估结果生成课程内容
     */
    generateCourseContent(assessmentResult, targetType = 'basic') {
        const template = this.courseTemplates[targetType];
        const content = {
            metadata: {
                generatedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                generator: 'AI培训课程生成器 v1.0'
            },
            course: {
                title: template.title,
                duration: template.duration,
                prerequisites: template.prerequisites || [],
                objectives: template.objectives,
                modules: template.modules.map((module, idx) => {
                    return {
                        ...module,
                        sequence: idx + 1
                    };
                }),
                exercises: template.exercises.map((exercise, idx) => {
                    return {
                        ...exercise,
                        sequence: idx + 1
                    };
                }),
                assessment: this.generateAssessmentInfo(assessmentResult)
            },
            schedule: this.generateSchedule(template.duration),
            resources: this.generateResources(template),
            evaluation: this.generateEvaluationCriteria(template)
        };

        return content;
    }

    /**
     * 生成评估信息
     */
    generateAssessmentInfo(assessmentResult) {
        const score = assessmentResult.assessment.overall.score;
        const level = assessmentResult.assessment.overall.adaptationLevel.level;
        
        let focusAreas = [];
        
        // 根据分数确定重点培训领域
        if (assessmentResult.assessment.basic.score < 60) {
            focusAreas.push('基础操作培训');
        }
        if (assessmentResult.assessment.depth.score < 60) {
            focusAreas.push('深度功能使用');
        }
        if (assessmentResult.assessment.challenges.score < 50) {
            focusAreas.push('管理层培训');
        }

        return {
            focusAreas,
            score,
            level,
            recommendations: assessmentResult.recommendations.optimizations.slice(0, 3)
        };
    }

    /**
     * 生成培训日程
     */
    generateSchedule(duration) {
        const schedule = [];
        const days = parseInt(duration);
        
        for (let day = 1; day <= days; day++) {
            schedule.push({
                day,
                time: '09:00-17:00',
                type: day % 2 === 1 ? '理论学习' : '实战练习',
                activities: [
                    '上午课程',
                    '下午练习',
                    '晚间复习'
                ]
            });
        }

        return schedule;
    }

    /**
     * 生成培训资源
     */
    generateResources(template) {
        const resources = {
            documents: [
                'AI律师团队协作全球标准v1.8.pdf',
                'AI法务团队协作全球标准v1.8.pdf',
                '快速入门指南.pdf',
                '常见问题FAQ.pdf'
            ],
            tools: [
                '在线学习平台',
                '模拟练习系统',
                '案例分析库',
                '知识库查询系统'
            ],
            materials: [
                '学员手册',
                '练习题库',
                '案例分析模板',
                '考核标准'
            ]
        };

        return resources;
    }

    /**
     * 生成评估标准
     */
    generateEvaluationCriteria(template) {
        return {
            knowledgeTest: {
                weight: 0.3,
                passScore: 70
            },
            practicalTest: {
                weight: 0.5,
                passScore: 70
            },
            classAttendance: {
                weight: 0.2,
                minAttendance: 0.9
            }
        };
    }

    /**
     * 生成PPT大纲
     */
    generatePPTOutline(course) {
        const pptOutline = {
            title: course.title + '培训课件',
            slides: []
        };

        // 封面页
        pptOutline.slides.push({
            page: 1,
            title: course.title,
            subtitle: `AI律师团队协作全球标准${this.standardVersion}`,
            sections: [
                '培训目标',
                '培训对象',
                '培训时长',
                '课程大纲',
                '讲师介绍'
            ]
        });

        // 目录页
        pptOutline.slides.push({
            page: 2,
            title: '课程目录',
            sections: course.modules.map((m, idx) => `${idx + 1}. ${m.title} (${m.duration})`)
        });

        // 课程内容页
        course.modules.forEach((module, idx) => {
            pptOutline.slides.push({
                page: idx + 3,
                title: module.title,
                sections: module.content
            });
        });

        // 练习题页
        pptOutline.slides.push({
            page: course.modules.length + 3,
            title: '练习题库',
            sections: course.exercises.map((e, idx) => `${idx + 1}. ${e.title}`)
        });

        // 评估标准页
        pptOutline.slides.push({
            page: course.modules.length + 4,
            title: '评估标准',
            sections: [
                '知识测试（30%）',
                '实操考试（50%）',
                '出勤率（20%）'
            ]
        });

        // 结束页
        pptOutline.slides.push({
            page: course.modules.length + 5,
            title: '总结与展望',
            sections: [
                '培训重点回顾',
                '后续支持',
                '联系方式',
                '致谢'
            ]
        });

        return pptOutline;
    }

    /**
     * 生成练习题PDF
     */
    generateExercisePDF(course) {
        const pdfContent = {
            title: course.title + '练习题库',
            version: 'v1.0',
            generatedAt: new Date().toISOString()
        };

        let content = `# ${course.title} - 练习题库\n\n`;
        content += `**标准版本：** ${this.standardVersion}\n\n`;

        content += `## 选择题\n\n`;
        course.exercises.forEach((ex, idx) => {
            if (ex.type === '选择题') {
                content += `题目 ${idx + 1}：${ex.title}\n\n`;
                content += `${ex.q}\n\n`;
                ex.options.forEach((opt, i) => {
                    content += `${String.fromCharCode(65 + i)}. ${opt}\n`;
                });
                content += `\n正确答案：${String.fromCharCode(65 + ex.correct - 1).toUpperCase()}\n\n`;
            }
        });

        content += `## 实战题\n\n`;
        course.exercises.forEach((ex, idx) => {
            if (ex.type === '情景题') {
                content += `题目 ${idx + 1}：${ex.title}\n\n`;
                content += `情景：${ex.scenario}\n\n`;
                content += `正确答案：${ex.correct === 'y' ? '是' : '否'}\n`;
                content += `分析：${ex.analysis}\n\n`;
            }
        });

        content += `## 操作题\n\n`;
        course.exercises.forEach((ex, idx) => {
            if (ex.type === '操作题') {
                content += `题目 ${idx + 1}：${ex.title}\n\n`;
                content += `任务：${ex.task}\n\n`;
                content += `评估标准：\n`;
                ex.criteria.forEach((c, i) => {
                    content += `${i + 1}. ${c}\n`;
                });
                content += `\n\n`;
            }
        });

        return content;
    }

    /**
     * 生成培训证书模板
     */
    generateCertificateTemplate(userInfo, courseName) {
        const template = `
╔══════════════════════════════════════════════════════════════╗
║                                                    ║
║     AI律师团队协作全球标准v1.8 培训结业证书           ║
║                                                    ║
║     ━──────────────────────────────────────────  ║
║     │                                              ║
║     │  证书编号：${new Date().getTime()}            ║
║     │  姓名：${userInfo.name}                    ║
║     │  机构：${userInfo.organization}            ║
║     │  培训课程：${courseName}                  ║
     │                                              ║
║     │  完成时间：${new Date().toLocaleDateString()}        ║
     │                                              ║
║     │  颁发机构：AI律师团队协作全球标准委员会   ║
║     │  认证讲师：AI培训系统                 ║
     │                                              ║
║     │  本证书证明持有人已完成相关培训，  ║
     │  掌握了标准的核心内容和操作方法，  ║
     │  具备在实际工作中应用AI律师标准的能力。  ║
     │                                              ║
║     ━──────────────────────────────────────────  ║
║                                                    ║
╚═════════════════════════════════════════════════════════╝
`;
        return template;
    }

    /**
     * 生成完整的培训包
     */
    generateTrainingPackage(assessmentResult, targetType) {
        const courseContent = this.generateCourseContent(assessmentResult, targetType);
        const pptOutline = this.generatePPTOutline(courseContent.course);
        const exercisePDF = this.generateExercisePDF(courseContent.course);
        const certTemplate = this.generateCertificateTemplate(
            assessmentResult.userInfo || { name: '学员' },
            courseContent.course.title
        );

        return {
            metadata: {
                generatedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                generator: 'AI培训课程生成器 v1.0',
                packageType: targetType
            },
            content: courseContent,
            pptOutline: pptOutline,
            exercises: exercisePDF,
            certificate: certTemplate
        };
    }

    /**
     * 导出为JSON
     */
    exportToJSON(trainingPackage) {
        return JSON.stringify(trainingPackage, null, 2);
    }

    /**
     * 导出为Markdown
     */
    exportToMarkdown(trainingPackage) {
        let md = `# ${trainingPackage.content.course.title}\n\n`;
        md += `**生成时间：** ${trainingPackage.metadata.generatedAt}\n`;
        md += `**标准版本：** ${trainingPackage.metadata.standardVersion}\n`;
        md += `**课程类型：** ${trainingPackage.metadata.packageType}\n\n`;

        md += `## 📚 课程内容\n\n`;
        md += `**课程时长：** ${trainingPackage.content.course.duration}\n\n`;
        md += `**课程目标：**\n\n`;
        trainingPackage.content.course.objectives.forEach((obj, i) => {
            md += `${i + 1}. ${obj}\n`;
        });
        md += '\n';

        md += `### 课程模块\n\n`;
        trainingPackage.content.course.modules.forEach((m, idx) => {
            md += `#### ${m.sequence}. ${m.title} (${m.duration})\n\n`;
            m.content.forEach((c, i) => {
                md += `- ${c}\n`;
            });
            md += '\n**活动安排：**\n';
            m.activities.forEach((a, i) => {
                md += `${i + 1}. ${a}\n`;
            });
            md += '\n';
        });

        md += `### 练习题库\n\n`;
        trainingPackage.content.course.exercises.forEach((ex, idx) => {
            md += `#### 题目 ${ex.sequence}：${ex.title}\n\n`;
            if (ex.type === '选择题') {
                md += `${ex.q}\n\n`;
                ex.options.forEach((opt, i) => {
                    md += `${String.fromCharCode(65 + i)}. ${opt}\n`;
                });
                md += `正确答案：${String.fromCharCode(65 + ex.correct - 1).toUpperCase()}\n\n`;
            } else if (ex.type === '情景题') {
                md += `情景：${ex.scenario}\n\n`;
                md += `正确答案：${ex.correct === 'y' ? '是' : '否'}\n`;
                md += `分析：${ex.analysis}\n\n`;
            } else if (ex.type === '操作题') {
                md += `任务：${ex.task}\n\n`;
                md += `评估标准：\n\n`;
                ex.criteria.forEach((c, i) => {
                    md += `${i + 1}. ${c}\n`;
                });
                md += '\n';
            }
        });

        md += `## 📋 PPT大纲\n\n`;
        trainingPackage.pptOutline.slides.forEach((slide, idx) => {
            md += `### 第${slide.page}页：${slide.title}\n\n`;
            slide.sections.forEach((s, i) => {
                md += `${i + 1}. ${s}\n`;
            });
            md += '\n';
        });

        md += `## 📄 证书模板\n\n`;
        md += `**证书标题：** AI律师团队协作全球标准v1.8 培训结业证书\n\n`;
        md += `**模板：**\n\n\`\`\`\`\n`;
        md += trainingPackage.certificate;
        md += `\`\`\`\`\n\n`;

        md += `## 📚 培训资源\n\n`;
        md += `### 文档\n\n`;
        trainingPackage.content.resources.documents.forEach((doc, idx) => {
            md += `${idx + 1}. ${doc}\n`;
        });
        md += '\n';

        md += `### 工具\n\n`;
        trainingPackage.content.resources.tools.forEach((tool, idx) => {
            md += `${idx + 1}. ${tool}\n`;
        });
        md += '\n';

        md += `### 材料\n\n`;
        trainingPackage.content.resources.materials.forEach((mat, idx) => {
            md += `${idx + 1}. ${mat}\n`;
        });
        md += '\n';

        return md;
    }
}

// 导出类
module.exports = TrainingCourseGenerator;

// 如果直接运行此文件，执行测试
if (require.main === module) {
    const generator = new TrainingCourseGenerator();

    // 测试数据：低适配度的评估结果
    const lowScoreResult = {
        assessment: {
            basic: { score: 45, details: {} },
            depth: { score: 30, details: {} },
            challenges: { score: 40, details: {} },
            overall: {
                score: 38,
                adaptationLevel: { level: '中低适配', color: '🟠', min: 0, max: 39 }
            },
            recommendations: {
                optimizations: [
                    {
                        priority: 'P0',
                        title: '加强IT基础设施建设',
                        description: 'IT基础设施评分较低',
                        estimatedTime: '1-3个月',
                        estimatedCost: '5-20万'
                    },
                    {
                        priority: 'P0',
                        title: '建设法律知识库',
                        description: '建立专业的法律知识库',
                        estimatedTime: '2-4个月',
                        estimatedCost: '10-30万'
                    }
                ]
            }
        },
        userInfo: {
            name: 'XX律师事务所',
            organization: 'XX律师事务所',
            industry: '法律服务',
            size: '小型律所'
        }
    };

    // 生成基础培训课程
    console.log('\n=== 基础培训课程 ===');
    const basicTraining = generator.generateTrainingPackage(lowScoreResult, 'basic');
    console.log('课程信息：', basicTraining.content.course.title);
    console.log('课程时长：', basicTraining.content.course.duration);
    console.log('模块数量：', basicTraining.content.course.modules.length);
    console.log('练习题数量：', basicTraining.content.course.exercises.length);
    console.log('\nPPT大纲：');
    console.log(JSON.stringify(basicTraining.pptOutline.slides, null, 2));

    // 生成进阶培训课程
    console.log('\n=== 进阶培训课程 ===');
    const advancedTraining = generator.generateTrainingPackage(lowScoreResult, 'advanced');
    console.log('课程信息：', advancedTraining.content.course.title);
    console.log('课程时长：', advancedTraining.content.course.duration);
    console.log('模块数量：', advancedTraining.content.course.modules.length);
    console.log('练习题数量：', advancedTraining.content.course.exercises.length);
    console.log('\nPPT大纲：');
    console.log(JSON.stringify(advancedTraining.pptOutline.slides, null, 2));

    // 生成管理员培训课程
    console.log('\n=== 管理员培训课程 ===');
    const managerTraining = generator.generateTrainingPackage(lowScoreResult, 'manager');
    console.log('课程信息：', managerTraining.content.course.title);
    console.log('课程时长：', managerTraining.content.course.duration);
    console.log('模块数量：', managerTraining.content.course.modules.length);
    console.log('练习题数量：', managerTraining.content.course.exercises.length);
    console.log('\nPPT大纲：');
    console.log(JSON.stringify(managerTraining.pptOutline.slides, null, 2));

    // 测试证书模板
    console.log('\n=== 证书模板 ===');
    const certTemplate = generator.generateCertificateTemplate(
        lowScoreResult.userInfo,
        basicTraining.content.course.title
    );
    console.log(certTemplate);
}
