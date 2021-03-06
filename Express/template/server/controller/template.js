const express = require('express');
const Template = require('../model/template');
const router = express.Router();

router.get('/demo', async (req, res) => {
    const temps = await Template.find({}).sort({update_at: -1})
    res.$success(temps);
})

router.get('/demo/:id', async (req, res) => {
    try {
        const temp = await Template.findById({_id: req.params.id})
        if (temp) {
            res.$success(temp);
        } else {
            res.$error('无数据', 400);
        }
    } catch (e) {
        res.$error('无数据', 403);
    }
})

router.post('/demo', async (req, res) => {
    const temp = await Template.create(req.body);
    res.$success(temp);
})

router.put('/demo/:id', async (req, res) => {
    const temp = await Template.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true
    })
    if (temp) {
        res.$success(temp);
    } else {
        res.$error('更新失败', 400)
    }
})

router.delete('/demo/:id', async (req, res) => {
    await Template.findByIdAndRemove({_id: req.params.id})
    try {
    res.$success('删除成功');
    } catch (e) {
        res.$error(e,400)
    }
})

module.exports = router;
