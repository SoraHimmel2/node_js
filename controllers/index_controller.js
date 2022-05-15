const index_index = (req, res) => {
    res.render('index.ejs', { title: 'Welcome to the Incident Page', controller: 'index_controller' });

}
module.exports = {
    index_index,
}