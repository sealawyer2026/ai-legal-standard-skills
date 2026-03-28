/**
 * 标准合规检查器
 * AI律师团队协作全球标准 v1.8
 * AI法务团队协作全球标准 v1.8
 */

const fs = require('fs-extra');
const path = require('path');

class ComplianceChecker {
    constructor() {
        this.standardVersion = 'v1.8';
        this.lawyerStandardPath = path.join(__dirname, '../../AI律师团队协作全球标准-v1.8.md');
        this.legalStandardPath = path.join(__dirname, '../../AI法务团队协作全球标准-v1.8.md');
        this.complianceRules = this.loadComplianceRules();
    }

    /**
     * 加载合规规则
     */
    loadComplianceRules() {
        return {
            // 中国法律法规合规
            legal: [
                {
                    id: 'r1',
                    category: '数据安全',
                    rule: '《网络安全法》合规',
                    description: '系统必须符合《网络安全法》要求，保障用户数据安全',
                    requirements: [
                        { id: 'r1-req1', description: '用户数据加密存储', critical: 'P0' },
                        { id: 'r1-req2', description: '数据访问权限控制', critical: 'P0' },
                        { id: 'r1-req3', description: '数据传输加密', critical: 'P1' },
                        { id: 'r1-req4', description: '数据备份机制', critical: 'P1' }
                    ],
                    penalties: [
                        '警告 + 责令整改',
                        '罚款：50万元以下',
                        '停业整顿'
                    ]
                },
                {
                    id: 'r2',
                    category: '个人信息保护',
                    rule: '《个人信息保护法》合规',
                    description: '系统必须符合《个人信息保护法》要求，保护个人信息安全',
                    requirements: [
                        { id: 'r2-req1', description: '用户同意机制', critical: 'P0' },
                        { id: 'r2-req2', description: '个人信息最小化收集', critical: 'P0' },
                        { id: 'r2-req3', description: '信息删除权', critical: 'P0' },
                        { id: 'r2-req4', description: '信息更正权', critical: 'P1' },
                        { id: 'r2-req5', description: '撤回同意权', critical: 'P1' }
                    ],
                    penalties: [
                        '警告 + 责令整改',
                        '罚款：50万元以下或违法所得的5%',
                        '停业整顿',
                        '吊销营业执照'
                    ]
                },
                {
                    id: 'r3',
                    category: '法律服务规范',
                    rule: '《律师法》合规',
                    description: 'AI工具的使用必须符合《律师法》的执业规范要求',
                    requirements: [
                        { id: 'r3-req1', description: '律师执业许可', critical: 'P0' },
                        { id: 'r3-req2', description: '法律意见书规范', critical: 'P1' },
                        { id: 'r3-req3', description: '律师执业伦理', critical: 'P0' },
                        { id: 'r3-req4', description: '案件保密义务', critical: 'P0' },
                        { id: 'r3-req5', description: '律师收费规范', critical: 'P1' }
                    ],
                    penalties: [
                        '警告',
                        '罚款：1-10万元',
                        '暂停执业1-3个月',
                        '吊销律师执业证书'
                    ]
                }
            ],
            // 国际标准合规
            international: [
                {
                    id: 'r4',
                    category: 'GDPR合规',
                    rule: 'GDPR（欧盟通用数据保护条例）合规',
                    description: '若服务欧盟客户，必须符合GDPR要求',
                    requirements: [
                        { id: 'r4-req1', description: '数据可携带权', critical: 'P1' },
                        { id: 'r4-req2', description: '被遗忘权', critical: 'P1' },
                        { id: 'r4-req3', description: '数据保护官指定', critical: 'P1' },
                        { id: 'r4-req4', description: '欧盟代表指定', critical: 'P1' }
                    ],
                    penalties: [
                        '警告',
                        '罚款：2000万欧元或全球年营业额的4%',
                        '禁止在欧盟运营'
                    ]
                }
            ],
            // 行业标准合规
            industry: [
                {
                    id: 'r5',
                    category: '行业技术标准',
                    rule: '行业标准与规范',
                    description: '系统符合法律服务行业的技术标准要求',
                    requirements: [
                        { id: 'r5-req1', description: 'ISO 27001信息安全认证', critical: 'P1' },
                        { id: 'r5-req2', description: 'ISO 9001质量管理认证', critical: 'P1' },
                        { id: 'r5-req3', description: '数据加密标准', critical: 'P0' },
                        { id: 'r5-req4', description: '备份和容灾标准', critical: 'P1' }
                    ],
                    penalties: [
                        '声誉损失',
                        '客户信任度下降',
                        '市场竞争优势降低'
                    ]
                },
                {
                    id: 'r6',
                    category: '人工智能伦理',
                    rule: 'AI伦理规范',
                    description: '符合AI应用的伦理规范',
                    requirements: [
                        { id: 'r6-req1', description: '透明度和可解释性', critical: 'P0' },
                        { id: 'r6-req2', description: '公平性和非歧视性', critical: 'P0' },
                        { id: 'r6-req3', description: '人工监督和干预', critical: 'P0' },
                        { id: 'r6-req4', description: '错误责任认定', critical: 'P0' }
                    ],
                    penalties: [
                        '声誉风险',
                        '法律风险',
                        '信任危机'
                    ]
                }
            ]
        };
    }

    /**
     * 检查合规性
     */
    async checkCompliance(systemInfo, checkOptions = {}) {
        const result = {
            metadata: {
                checkedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                checker: 'AI标准合规检查器 v1.0'
            },
            systemInfo: systemInfo,
            results: {
                overall: {
                    score: 0,
                    level: '',
                    compliant: false,
                    criticalIssues: [],
                    warnings: []
                },
                legal: [],
                international: [],
                industry: []
            },
            recommendations: []
        };

        // 检查法律法规合规
        result.results.legal = this.checkLegalCompliance(systemInfo);

        // 检查国际标准合规（如果需要）
        if (checkOptions.checkGDPR) {
            result.results.international = this.checkInternationalCompliance(systemInfo);
        }

        // 检查行业标准合规
        result.results.industry = this.checkIndustryCompliance(systemInfo);

        // 计算综合评分
        result.results.overall = this.calculateOverallScore(result.results);

        // 生成建议
        result.recommendations = this.generateRecommendations(result.results);

        return result;
    }

    /**
     * 检查法律法规合规
     */
    checkLegalCompliance(systemInfo) {
        const results = [];
        const legalRules = this.complianceRules.legal;

        legalRules.forEach(rule => {
            const ruleResult = {
                ruleId: rule.id,
                category: rule.category,
                rule: rule.rule,
                description: rule.description,
                status: 'unknown',
                requirements: [],
                issues: [],
                score: 0,
                maxScore: 0
            };

            // 检查每个要求
            rule.requirements.forEach(req => {
                const reqResult = this.checkRequirement(systemInfo, req);
                ruleResult.requirements.push(reqResult);
                ruleResult.score += reqResult.score;
                ruleResult.maxScore += 5;
                
                if (reqResult.status !== 'compliant') {
                    ruleResult.issues.push(reqResult);
                }
            });

            // 确定规则状态
            const compliantCount = ruleResult.requirements.filter(r => r.status === 'compliant').length;
            const totalCount = ruleResult.requirements.length;
            const complianceRate = totalCount > 0 ? compliantCount / totalCount : 1;

            if (complianceRate >= 0.8) {
                ruleResult.status = 'compliant';
                ruleResult.score = Math.round(complianceRate * 100);
            } else if (complianceRate >= 0.6) {
                ruleResult.status = 'partial';
                ruleResult.score = Math.round(complianceRate * 100);
            } else if (complianceRate >= 0.4) {
                ruleResult.status = 'warning';
                ruleResult.score = Math.round(complianceRate * 100);
            } else {
                ruleResult.status = 'non-compliant';
                ruleResult.score = 0;
            }

            results.push(ruleResult);
        });

        return results;
    }

    /**
     * 检查单个要求
     */
    checkRequirement(systemInfo, requirement) {
        const result = {
            requirementId: requirement.id,
            description: requirement.description,
            critical: requirement.critical,
            status: 'unknown',
            score: 0,
            details: ''
        };

        // 根据系统信息判断是否合规
        const isCompliant = this.checkRequirementImplementation(systemInfo, requirement);

        if (isCompliant) {
            result.status = 'compliant';
            result.score = 5;
            result.details = '符合要求';
        } else {
            result.status = 'non-compliant';
            result.score = 0;
            result.details = '不符合要求，需整改';
        }

        return result;
    }

    /**
     * 检查要求的实现情况
     */
    checkRequirementImplementation(systemInfo, requirement) {
        const key = requirement.description;
        
        // 根据不同要求类型检查
        if (key.includes('加密')) {
            return systemInfo.security && systemInfo.security.encryption === 'enabled';
        } else if (key.includes('权限控制')) {
            return systemInfo.security && systemInfo.security.accessControl === 'enabled';
        } else if (key.includes('备份')) {
            return systemInfo.security && systemInfo.security.backup === 'enabled';
        } else if (key.includes('同意机制')) {
            return systemInfo.privacy && systemInfo.privacy.consent === 'enabled';
        } else if (key.includes('最小化')) {
            return systemInfo.privacy && systemInfo.privacy.dataMinimization === 'enabled';
        } else if (key.includes('删除权')) {
            return systemInfo.privacy && systemInfo.privacy.rightToDelete === 'enabled';
        } else if (key.includes('更正权')) {
            return systemInfo.privacy && systemInfo.privacy.rightToCorrect === 'enabled';
        } else if (key.includes('撤回')) {
            return systemInfo.privacy && systemInfo.privacy.rightToWithdraw === 'enabled';
        } else if (key.includes('执业许可')) {
            return systemInfo.legal && systemInfo.legal.practicingLicense === 'valid';
        } else if (key.includes('意见书规范')) {
            return systemInfo.legal && systemInfo.legal.opinionFormat === 'standard';
        } else if (key.includes('伦理')) {
            return systemInfo.legal && systemInfo.legal.ethicsCompliance === 'compliant';
        } else if (key.includes('保密')) {
            return systemInfo.legal && systemInfo.legal.confidentiality === 'guaranteed';
        } else if (key.includes('收费规范')) {
            return systemInfo.legal && systemInfo.legal.pricingCompliance === 'compliant';
        } else if (key.includes('透明')) {
            return systemInfo.ai && systemInfo.ai.transparency === 'enabled';
        } else if (key.includes('公平')) {
            return systemInfo.ai && systemInfo.ai.fairness === 'ensured';
        } else if (key.includes('监督')) {
            return systemInfo.ai && systemInfo.ai.humanSupervision === 'enabled';
        } else if (key.includes('责任')) {
            return systemInfo.ai && systemInfo.ai.liability !== undefined;
        } else {
            // 默认返回部分符合
            return systemInfo.general && systemInfo.general.compliance > 0.6;
        }
    }

    /**
     * 检查国际标准合规
     */
    checkInternationalCompliance(systemInfo) {
        const results = [];
        const intlRules = this.complianceRules.international;

        intlRules.forEach(rule => {
            const ruleResult = {
                ruleId: rule.id,
                category: rule.category,
                rule: rule.rule,
                description: rule.description,
                status: 'unknown',
                requirements: [],
                issues: [],
                score: 0,
                maxScore: 0
            };

            rule.requirements.forEach(req => {
                const reqResult = this.checkRequirement(systemInfo, req);
                ruleResult.requirements.push(reqResult);
                ruleResult.score += reqResult.score;
                ruleResult.maxScore += 5;
                
                if (reqResult.status !== 'compliant') {
                    ruleResult.issues.push(reqResult);
                }
            });

            const compliantCount = ruleResult.requirements.filter(r => r.status === 'compliant').length;
            const totalCount = ruleResult.requirements.length;
            const complianceRate = totalCount > 0 ? compliantCount / totalCount : 1;

            if (complianceRate >= 0.8) {
                ruleResult.status = 'compliant';
                ruleResult.score = Math.round(complianceRate * 100);
            } else if (complianceRate >= 0.6) {
                ruleResult.status = 'partial';
                ruleResult.score = Math.round(complianceRate * 100);
            } else {
                ruleResult.status = 'non-compliant';
                ruleResult.score = 0;
            }

            results.push(ruleResult);
        });

        return results;
    }

    /**
     * 检查行业标准合规
     */
    checkIndustryCompliance(systemInfo) {
        const results = [];
        const industryRules = this.complianceRules.industry;

        industryRules.forEach(rule => {
            const ruleResult = {
                ruleId: rule.id,
                category: rule.category,
                rule: rule.rule,
                description: rule.description,
                status: 'unknown',
                requirements: [],
                issues: [],
                score: 0,
                maxScore: 0
            };

            rule.requirements.forEach(req => {
                const reqResult = this.checkRequirement(systemInfo, req);
                ruleResult.requirements.push(reqResult);
                ruleResult.score += reqResult.score;
                ruleResult.maxScore += 5;
                
                if (reqResult.status !== 'compliant') {
                    ruleResult.issues.push(reqResult);
                }
            });

            const compliantCount = ruleResult.requirements.filter(r => r.status === 'compliant').length;
            const totalCount = ruleResult.requirements.length;
            const complianceRate = totalCount > 0 ? compliantCount / totalCount : 1;

            if (complianceRate >= 0.8) {
                ruleResult.status = 'compliant';
                ruleResult.score = Math.round(complianceRate * 100);
            } else if (complianceRate >= 0.6) {
                ruleResult.status = 'partial';
                ruleResult.score = Math.round(complianceRate * 100);
            } else {
                ruleResult.status = 'non-compliant';
                ruleResult.score = 0;
            }

            results.push(ruleResult);
        });

        return results;
    }

    /**
     * 计算综合评分
     */
    calculateOverallScore(results) {
        // 权重配置
        const weights = {
            legal: 0.5,
            international: 0.3,
            industry: 0.2
        };

        let totalScore = 0;
        let totalWeight = 0;
        let criticalIssues = [];
        let warnings = [];

        // 计算各部分得分
        const legalScore = this.calculateCategoryScore(results.legal);
        const intlScore = results.international.length > 0 ? this.calculateCategoryScore(results.international) : { score: 100 };
        const indScore = this.calculateCategoryScore(results.industry);

        // 加权总分
        totalScore = legalScore.weightedScore + 
                    (intlScore.weightedScore || 0) * weights.international +
                    indScore.weightedScore * weights.industry;
        totalWeight = weights.legal * 5 * results.legal.length +
                    weights.international * 5 * results.international.length +
                    weights.industry * 5 * results.industry.length;

        // 收集问题和警告
        results.legal.forEach(r => {
            if (r.status === 'non-compliant') {
                const criticalIssues = r.issues.filter(i => i.critical === 'P0');
                criticalIssues.push(...criticalIssues);
            } else if (r.status === 'warning') {
                warnings.push(r);
            }
        });

        if (results.international.length > 0) {
            results.international.forEach(r => {
                if (r.status === 'non-compliant') {
                    warnings.push(r);
                }
            });
        }

        results.industry.forEach(r => {
            if (r.status === 'non-compliant') {
                warnings.push(r);
            }
        });

        // 确定综合等级
        const score = Math.round(totalWeight > 0 ? (totalScore / totalWeight) * 100 : 100);
        let level = '';
        let compliant = false;

        if (score >= 90) {
            level = '完全合规';
            compliant = true;
        } else if (score >= 75) {
            level = '基本合规';
            compliant = true;
        } else if (score >= 60) {
            level = '部分合规';
            compliant = false;
        } else {
            level = '不合规';
            compliant = false;
        }

        return {
            score: score,
            level: level,
            compliant: compliant,
            criticalIssues: criticalIssues,
            warnings: warnings
        };
    }

    /**
     * 计算类别得分
     */
    calculateCategoryScore(categoryResults) {
        let totalScore = 0;
        let totalWeight = 0;

        categoryResults.forEach(r => {
            totalScore += r.score;
            totalWeight += r.maxScore;
        });

        return {
            score: totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 100,
            weightedScore: totalScore
        };
    }

    /**
     * 生成建议
     */
    generateRecommendations(results) {
        const recommendations = [];

        // 检查关键问题（P0）
        const p0Issues = results.overall.criticalIssues;
        if (p0Issues.length > 0) {
            recommendations.push({
                priority: 'P0',
                category: '紧急修复',
                title: '立即修复关键合规问题',
                description: `发现${p0Issues.length}个P0级关键问题，必须立即修复，否则可能导致法律风险`,
                issues: p0Issues.map(i => `${i.requirement.description} - ${i.details}`),
                suggestedActions: [
                    '立即暂停相关功能',
                    '制定修复计划',
                    '聘请法律顾问',
                    '在24小时内提交修复报告'
                ]
            });
        }

        // 检查警告
        if (results.overall.warnings.length > 0) {
            recommendations.push({
                priority: 'P1',
                category: '重要改进',
                title: '整改合规警告',
                description: `发现${results.overall.warnings.length}个合规警告，建议1-2周内整改`,
                issues: results.overall.warnings.slice(0, 5),
                suggestedActions: [
                    '制定整改计划',
                    '分配整改负责人',
                    '2周内完成整改',
                    '更新合规文档'
                ]
            });
        }

        // 如果基本合规，建议持续改进
        if (results.overall.score >= 90) {
            recommendations.push({
                priority: 'P2',
                category: '持续改进',
                title: '持续优化',
                description: '当前合规状况良好，建议持续优化',
                suggestedActions: [
                    '定期合规检查（每月）',
                    '持续更新合规文档',
                    '关注法规变化',
                    '参加培训课程'
                ]
            });
        }

        return recommendations;
    }

    /**
     * 生成合规报告
     */
    generateReport(complianceCheckResult) {
        const report = {
            metadata: {
                generatedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                checker: 'AI标准合规检查器 v1.0'
            },
            system: complianceCheckResult.systemInfo,
            overall: complianceCheckResult.results.overall,
            details: {
                legal: complianceCheckResult.results.legal,
                international: complianceCheckResult.results.international,
                industry: complianceCheckResult.results.industry
            },
            recommendations: complianceCheckResult.recommendations
        };

        return report;
    }

    /**
     * 导出为JSON
     */
    exportToJSON(report) {
        return JSON.stringify(report, null, 2);
    }

    /**
     * 导出为Markdown
     */
    exportToMarkdown(report) {
        let md = `# AI标准合规检查报告\n\n`;
        md += `**检查时间：** ${report.metadata.generatedAt}\n`;
        md += `**标准版本：** ${report.metadata.standardVersion}\n\n`;

        md += `## 📊 合规概况\n\n`;
        md += `**综合评分：** ${report.overall.score}分/100分\n`;
        md += `**合规等级：** ${report.overall.level}\n`;
        md += `**是否合规：** ${report.overall.compliant ? '✅ 是' : '❌ 否'}\n\n`;

        if (report.overall.criticalIssues.length > 0) {
            md += `## 🚨 关键问题（P0）\n\n`;
            report.overall.criticalIssues.forEach((issue, idx) => {
                md += `${idx + 1}. **${issue.rule}**\n`;
                md += `   - 问题：${issue.requirement.description}\n`;
                md += `   - 详情：${issue.details}\n`;
                md += `   - 影响：${issue.penalty}\n\n`;
            });
        }

        if (report.overall.warnings.length > 0) {
            md += `## ⚠️ 警告信息\n\n`;
            report.overall.warnings.slice(0, 5).forEach((warning, idx) => {
                md += `${idx + 1}. [${warning.category}] ${warning.rule}：${warning.status}\n`;
                md += `   - 评分：${warning.score}/100\n`;
                md += `   - 描述：${warning.description}\n\n`;
            });
        }

        md += `## 📋 法规合规详情\n\n`;
        report.details.legal.forEach((rule, idx) => {
            md += `### ${idx + 1}. ${rule.category} - ${rule.rule}\n\n`;
            md += `**状态：** ${rule.status}\n`;
            md += `**评分：** ${rule.score}/100\n`;
            md += `**要求：**\n`;
            rule.requirements.forEach((req, i) => {
                const statusIcon = req.status === 'compliant' ? '✅' : '❌';
                md += `${i + 1}. ${statusIcon} ${req.description}\n`;
            });
            md += '\n';
        });

        if (report.details.international.length > 0) {
            md += `## 🌍 国际标准详情\n\n`;
            report.details.international.forEach((rule, idx) => {
                md += `### ${idx + 1}. ${rule.category} - ${rule.rule}\n\n`;
                md += `**状态：** ${rule.status}\n`;
                md += `**评分：** ${rule.score}/100\n`;
                md += `**要求：**\n`;
                rule.requirements.forEach((req, i) => {
                    const statusIcon = req.status === 'compliant' ? '✅' : '❌';
                    md += `${i + 1}. ${statusIcon} ${req.description}\n`;
                });
                md += '\n';
            });
        }

        md += `## 🔧 行业标准详情\n\n`;
        report.details.industry.forEach((rule, idx) => {
            md += `### ${idx + 1}. ${rule.category} - ${rule.rule}\n\n`;
            md += `**状态：** ${rule.status}\n`;
            md += `**评分：** ${rule.score}/100\n`;
            md += `**要求：**\n`;
            rule.requirements.forEach((req, i) => {
                const statusIcon = req.status === 'compliant' ? '✅' : '❌';
                md += `${i + 1}. ${statusIcon} ${req.description}\n`;
            });
            md += '\n';
        });

        md += `## 💡 改进建议\n\n`;
        report.recommendations.forEach((rec, idx) => {
            md += `### ${idx + 1}. [${rec.priority}] ${rec.category} - ${rec.title}\n\n`;
            md += `**描述：** ${rec.description}\n\n`;
            md += `**建议行动：**\n`;
            if (rec.suggestedActions) {
                rec.suggestedActions.forEach((action, i) => {
                    md += `${i + 1}. ${action}\n`;
                });
            }
            md += '\n';
            if (rec.issues) {
                md += `**问题列表：**\n`;
                rec.issues.slice(0, 3).forEach((issue, i) => {
                    md += `${i + 1}. ${issue}\n`;
                });
                md += '\n';
            }
        });

        return md;
    }
}

// 导出类
module.exports = ComplianceChecker;

// 如果直接运行此文件，执行测试
if (require.main === module) {
    const checker = new ComplianceChecker();

    // 测试系统信息（高合规）
    const highComplianceSystem = {
        security: {
            encryption: 'enabled',
            accessControl: 'enabled',
            backup: 'enabled',
            dataProtection: 'full'
        },
        privacy: {
            consent: 'enabled',
            dataMinimization: 'enabled',
            rightToDelete: 'enabled',
            rightToCorrect: 'enabled',
            rightToWithdraw: 'enabled'
        },
        legal: {
            practicingLicense: 'valid',
            opinionFormat: 'standard',
            ethicsCompliance: 'compliant',
            confidentiality: 'guaranteed',
            pricingCompliance: 'compliant'
        },
        ai: {
            transparency: 'enabled',
            fairness: 'ensured',
            humanSupervision: 'enabled',
            liability: 'defined'
        },
        general: {
            compliance: 0.98,
            lastAudit: '2026-03-25'
        }
    };

    // 检查合规性（不包括GDPR）
    console.log('\n=== 高合规系统检查（不含GDPR）===');
    checker.checkCompliance(highComplianceSystem).then(result => {
        console.log('=== 合规报告（JSON）===');
        console.log(JSON.stringify(result, null, 2));
        
        console.log('\n=== 合规报告（Markdown）===');
        console.log(checker.exportToMarkdown(result));
    });

    // 检查合规性（包括GDPR）
    console.log('\n=== 高合规系统检查（含GDPR）===');
    checker.checkCompliance(highComplianceSystem, { checkGDPR: true }).then(result => {
        console.log('=== 合规报告（JSON）===');
        console.log(JSON.stringify(result, null, 2));
        
        console.log('\n=== 合规报告（Markdown）===');
        console.log(checker.exportToMarkdown(result));
    });
}
