const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

const shortenUrl = async (req, res) => {

    const { data, error } = await supabase
        .from('urls')
        .select('url')
        .eq('url', req.query.custom_url)

    if (data.length == 0) {
        const { data, error } = await supabase
            .from('urls')
            .insert([
                { url: req.query.custom_url, redirect_url: req.query.url },
            ])

        if (error) {
            return res.status(500).send({ success: false, error: error.message, code: 'generic_error' })
        }

        res.send({success: true, shortUrl: `${req.protocol}://${req.get('host')}/${req.query.custom_url}`})
    } else {
        return res.status(500).send({ success: false, error: 'Url already exists', code: 'url_exists' })
    }
}

const getUrl = async (req, res) => {

    const { data, error } = await supabase
        .from('urls')
        .select('url, redirect_url')
        .eq('url', req.params.custom_url)

    if (data.length != 0) {
        return res.redirect(data[0].redirect_url)
    } else {
        res.send(`<h1 style="text-align: center">Url not found</h1>`)
    }
}

module.exports = {
    shortenUrl,
    getUrl
}