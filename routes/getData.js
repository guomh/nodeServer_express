/**
 * Created by guominghui on 17/5/16.
 */
var express = require('express');
var router = express.Router();
let multiparty = require('multiparty');
let msg = require('../model/responseMSG');
/* GET users listing. */
router.use(function(req, res, next){
    res.append('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","content-type,Content-Type");
    next();
});
router.get('/turbine/getturbineparam', function(req, res, next) {
    let typeFlag = req.query.typeFlag;
    let obj;
    if(typeFlag ==1){
        obj =﻿[
            {
                "pageNum": 1,
                "pageSize": 10,
                "pageFlag": false,
                "dataTypeCode": "5004",
                "dataTypeName": "软件版本信息",
                "level": null,
                "index": 1,
                "updateTime": null,
                "varrables": [
                    {
                        "pageNum": 1,
                        "pageSize": 10,
                        "pageFlag": false,
                        "turbineVarId": 101,
                        "arraryname": null,
                        "index": null,
                        "dataTypeCode": null,
                        "sysTypeCode": null,
                        "iecpath": "WTUR.Other.Rg.S.WfscadaIdCFG",
                        "iecversion": null,
                        "chinesename": "风电场SCADA编号",
                        "englishname": null,
                        "status": null,
                        "updateTime": null,
                        "changeData": null
                    },
                    {
                        "pageNum": 1,
                        "pageSize": 10,
                        "pageFlag": false,
                        "turbineVarId": 102,
                        "arraryname": null,
                        "index": null,
                        "dataTypeCode": null,
                        "sysTypeCode": null,
                        "iecpath": "WTUR.Other.Rg.S.WtscadaIdCFG",
                        "iecversion": null,
                        "chinesename": "风机SCADA编号",
                        "englishname": null,
                        "status": null,
                        "updateTime": null,
                        "changeData": null
                    }
                ]
            }
        ];
    }else {
        obj=﻿[
                {
                    "pageNum": 1,
                    "pageSize": 10,
                    "pageFlag": false,
                    "sysTypeCode": "10",
                    "sysTypeName": "中控系统",
                    "level": null,
                    "parentCode": null,
                    "index": 3,
                    "updateTime": null,
                    "children": [
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1001",
                            "sysTypeName": "SCADA",
                            "level": null,
                            "parentCode": "10",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 103,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.StandardVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "中控协议版本号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 102,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.WtscadaIdCFG",
                                    "iecversion": null,
                                    "chinesename": "风机SCADA编号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 101,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.WfscadaIdCFG",
                                    "iecversion": null,
                                    "chinesename": "风电场SCADA编号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        }
                    ]
                },
                {
                    "pageNum": 1,
                    "pageSize": 10,
                    "pageFlag": false,
                    "sysTypeCode": "11",
                    "sysTypeName": "主控系统",
                    "level": null,
                    "parentCode": null,
                    "index": 2,
                    "updateTime": null,
                    "children": [
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1101",
                            "sysTypeName": "PLC参数",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 131,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.HwDateCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC硬件出厂日期",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 135,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.IlevelCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC镜像等级",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 130,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.HwVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC硬件版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 129,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.HwSerialNoCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC硬件串号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 128,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.HwmodelCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC硬件型号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 142,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.AmsNetCFG",
                                    "iecversion": null,
                                    "chinesename": "PLCAmsNetID",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 141,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.TCATlevelCFG",
                                    "iecversion": null,
                                    "chinesename": "Twincat等级",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 140,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.TCATbuildCFG",
                                    "iecversion": null,
                                    "chinesename": "Twincat开发号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 139,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.TCATRevisionCFG",
                                    "iecversion": null,
                                    "chinesename": "Twincat修订版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 134,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.IVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC镜像版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 138,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.TCATversionCFG",
                                    "iecversion": null,
                                    "chinesename": "Twincat主版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 133,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.IdeviceCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC镜像设备型号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 137,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.IOVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC镜像系统版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 132,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.HwCPUCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC硬件所用CPU",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 136,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.IONameCFG",
                                    "iecversion": null,
                                    "chinesename": "PLC镜像操作系统",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1103",
                            "sysTypeName": "偏航系统",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 220,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WYAW.Other.Ra.F32.LubintervaltimeCFG",
                                    "iecversion": null,
                                    "chinesename": "偏航润滑自动加脂间隔时间",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 2,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WYAW.Bool.Rd.b0.YawlubenableCFG",
                                    "iecversion": null,
                                    "chinesename": "偏航润滑加脂使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 219,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WYAW.Other.Ra.F32.LocruducfactorCFG",
                                    "iecversion": null,
                                    "chinesename": "偏航位置换算系数",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1104",
                            "sysTypeName": "功率曲线",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 1,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.HtblachoiceCFG",
                                    "iecversion": null,
                                    "chinesename": "辉腾37.5叶片选择使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1112",
                            "sysTypeName": "机组连续自启动次数限系统",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 221,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rn.U16.StartautotimeslimCFG",
                                    "iecversion": null,
                                    "chinesename": "机组连续自启动次数限制",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1113",
                            "sysTypeName": "测风系统",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 215,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Ra.F32.WindanecorrecteCFG",
                                    "iecversion": null,
                                    "chinesename": "风速校正系数",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 214,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rn.U16.WindaneTypeCFG",
                                    "iecversion": null,
                                    "chinesename": "风速仪类型",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 218,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rn.U16.WindvaneTypeCFG",
                                    "iecversion": null,
                                    "chinesename": "风向标类型",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1115",
                            "sysTypeName": "温湿度控制",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 6,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WCNV.Bool.Rd.b0.Dispel1feedbackCFG",
                                    "iecversion": null,
                                    "chinesename": "变流器除湿功能使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 68,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WCNV.Bool.Rd.b0.WetareaCFG",
                                    "iecversion": null,
                                    "chinesename": "变流器预加热潮湿地区选择",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 16,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WCNV.Bool.Rd.b0.PowdryCFG",
                                    "iecversion": null,
                                    "chinesename": "变流柜上电强制加热功能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1116",
                            "sysTypeName": "湍流控制",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 25,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.TlWindstopcontrolCFG",
                                    "iecversion": null,
                                    "chinesename": "湍流风事件停机控制使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 24,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.TlWindwdircontrolCFG",
                                    "iecversion": null,
                                    "chinesename": "湍流风桨叶控制使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 23,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.TlWindspdcontrolCFG",
                                    "iecversion": null,
                                    "chinesename": "湍流风转速控制使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 39,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.TurwindfiltenableCFG",
                                    "iecversion": null,
                                    "chinesename": "湍流风功率曲线剔除使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1117",
                            "sysTypeName": "版本信息",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 127,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.WebVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "网页监控软件版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 126,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.WeaprogVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "weaprog版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 125,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.ErrdefFileInfoCFG",
                                    "iecversion": null,
                                    "chinesename": "故障参数文件版本号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 124,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.EvtFileVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "事件参数文件版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 121,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.GMPVersionCFG",
                                    "iecversion": null,
                                    "chinesename": "电能表参数版本",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 107,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.PlcversionCFG",
                                    "iecversion": null,
                                    "chinesename": "风机主控程序版本号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 106,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.InitFileInfoCFG",
                                    "iecversion": null,
                                    "chinesename": "初始化文件版本号",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1118",
                            "sysTypeName": "环境温度",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 246,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Temp.Ra.F32.TemptenmaxCFG",
                                    "iecversion": null,
                                    "chinesename": "环境温度10分钟最大值限值",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 245,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Temp.Ra.F32.LtempstopwindCFG",
                                    "iecversion": null,
                                    "chinesename": "环境温度低机组停机温度限值",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 244,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Temp.Ra.F32.HtempstopwindCFG",
                                    "iecversion": null,
                                    "chinesename": "环境温度高机组停机温度限值",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 17,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.TempOuthighCFG",
                                    "iecversion": null,
                                    "chinesename": "环境温度高增值功能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1119",
                            "sysTypeName": "电能系统",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 211,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rn.U16.GridMeasureTypeCFG",
                                    "iecversion": null,
                                    "chinesename": "电能测试系统类型",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1121",
                            "sysTypeName": "自启动",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 222,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Ra.F32.StartautotimeintervalCFG",
                                    "iecversion": null,
                                    "chinesename": "自启动时间间隔",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 3,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.EnAutoStartCFG",
                                    "iecversion": null,
                                    "chinesename": "上电自启功能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1122",
                            "sysTypeName": "连续远程复位操作次数系统",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 225,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rn.U16.RemoteresetcontimesCFG",
                                    "iecversion": null,
                                    "chinesename": "连续远程复位操作次数限值",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1123",
                            "sysTypeName": "配置信息",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 104,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.IPAddressCFG",
                                    "iecversion": null,
                                    "chinesename": "风机IP地址",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                },
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 105,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Other.Rg.S.TurbineConfigCFG",
                                    "iecversion": null,
                                    "chinesename": "风机配置信息",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        },
                        {
                            "pageNum": 1,
                            "pageSize": 10,
                            "pageFlag": false,
                            "sysTypeCode": "1125",
                            "sysTypeName": "震动控制",
                            "level": null,
                            "parentCode": "11",
                            "index": null,
                            "updateTime": null,
                            "varrables": [
                                {
                                    "pageNum": 1,
                                    "pageSize": 10,
                                    "pageFlag": false,
                                    "turbineVarId": 22,
                                    "arraryname": null,
                                    "index": null,
                                    "dataTypeCode": null,
                                    "sysTypeCode": null,
                                    "iecpath": "WTUR.Bool.Rd.b0.8XzdglCFG",
                                    "iecversion": null,
                                    "chinesename": "8x振动功率动作使能",
                                    "englishname": null,
                                    "status": null,
                                    "updateTime": null,
                                    "changeData": null
                                }
                            ]
                        }
                    ]
                }

            ]
    }

    res.json(msg.success(obj));
});

router.get('/turbine/getchangedata', function(req, res, next) {
    let obj = ﻿[
        {
            "pageNum": 1,
            "pageSize": 10,
            "pageFlag": false,
            "changedataId": null,
            "wfId": null,
            "wtId": null,
            "iecpath": null,
            "rectime": null,
            "changedata": "false",
            "endtime": null,
            "source": null,
            "updateTime": null
        },
        {
            "pageNum": 1,
            "pageSize": 10,
            "pageFlag": false,
            "changedataId": null,
            "wfId": null,
            "wtId": null,
            "iecpath": null,
            "rectime": null,
            "changedata": "123",
            "endtime": null,
            "source": null,
            "updateTime": null
        },
        {
            "pageNum": 1,
            "pageSize": 10,
            "pageFlag": false,
            "changedataId": null,
            "wfId": null,
            "wtId": null,
            "iecpath": null,
            "rectime": null,
            "changedata": "456",
            "endtime": null,
            "source": null,
            "updateTime": null
        }
    ]
    res.json(msg.success(obj));
});
router.get('/staffGroup', function(req, res, next) {
    let deptCode = req.query.deptCode;
    let obj = [];
    if (deptCode == 21) {
        obj = [
            {name:'王伟强',id:1,job:'经理'},
            {name:'王伟强2',id:2,job:'经理'},
            {name:'王伟强3',id:3,job:'经理'},
            {name:'王伟强4',id:4,job:'经理'},
            {name:'王伟强5',id:5,job:'经理'},
            {name:'王伟强6',id:6,job:'经理'},
        ]
    } else if (deptCode == 22){
        obj = [
            {name:'王伟强7',id:7,job:'经理'},
            {name:'王伟强8',id:8,job:'经理'},
            {name:'王伟强9',id:9,job:'经理'},
            {name:'王伟强10',id:10,job:'经理'},
            {name:'王伟强11',id:11,job:'经理'},
            {name:'王伟强12',id:12,job:'经理'},
        ]
    }
    res.json(msg.success(obj));
});
router.get('/allDept', function(req, res, next) {
    let obj = [
        {
            oaDeptName:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            oaDeptCode:1,
            children:[
                {
                    oaDeptName:'aa2222222222222',
                    oaDeptCode:11,
                    children:[
                        {
                            oaDeptName:'aa333333333333333',
                            oaDeptCode:21,
                        },
                        {
                            oaDeptName:'bbbbbbbbbbbbbbb',
                            oaDeptCode:22
                        },
                        {
                            oaDeptName:'ccc',
                            oaDeptCode:23
                        }
                    ]
                },
                {
                    oaDeptName:'bbbbbbbbbbbbbbb',
                    oaDeptCode:12
                },
                {
                    oaDeptName:'ccc',
                    oaDeptCode:13
                }
            ]
        },
        {
            oaDeptName:'bbbbbbbbbbbbbbb',
            oaDeptCode:2
        },
        {
            oaDeptName:'ccc',
            oaDeptCode:3
        }


    ]
    res.json(msg.success(obj));
})
router.post('/woprocess/timeaxis', function(req, res, next) {
    let obj = [
        {
            "proprocessInstanceId":"2505",
            "executionId":"2505",
            "taskId":"2512",
            "taskKey":"Approval_ALL_SelfDeptLeader",
            "taskAssignee":null,
            "taskType":null,
            "startAssignee":null,
            "assignee":"27050",
            "assignees":null,
            "assigneeList":null,
            "mainAssignee":null,
            "deptAssignee":null,
            "subTaskList":null,
            "agree":1,
            "auth":null,
            "execute":null,
            "sign":null,
            "dleader":null,
            "cleader":null,
            "main":null,
            "operatorTime":"2017-05-21 19:25:34",
        "taskStatus":1,
    "userId":"3315",
        "userName":"闫部长",
    "oaDeptCode":"研发部",
        "oaDeptName":"01005090",
        "sysDeptId":null,
        "sysDeptName":"",
        "operatorAdvice":"非常好",
        "description":"01005090-领导",
    "signTeams":null,
        "singleDeptId":null,
        "multiDeptIds":null,
        "centerLeaders":null
},
        {
            "proprocessInstanceId":"2505",
            "executionId":"2505",
            "taskId":"2512",
            "taskKey":"Approval_ALL_SelfDeptLeader",
            "taskAssignee":null,
            "taskType":null,
            "startAssignee":null,
            "assignee":"27050",
            "assignees":null,
            "assigneeList":null,
            "mainAssignee":null,
            "deptAssignee":null,
            "subTaskList":null,
            "agree":1,
            "auth":null,
            "execute":null,
            "sign":null,
            "dleader":null,
            "cleader":null,
            "main":null,
            "operatorTime":"2017-05-21 19:25:34",
            "taskStatus":0,
            "userId":"3315",
            "userName":"闫部长",
            "oaDeptCode":"研发部",
            "oaDeptName":"01005090",
            "sysDeptId":null,
            "sysDeptName":"",
            "operatorAdvice":"非常好",
            "description":"01005090-领导",
            "signTeams":null,
            "singleDeptId":null,
            "multiDeptIds":null,
            "centerLeaders":null
        }
    ]
    res.json(msg.success(obj));
});
router.get('/kpiuserwfextend', function(req, res, next) {
    var obj = [{}];

    res.json(msg.success(obj));
})
module.exports = router;