const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    const post = new Post(req.body)

    try {
        await post.save();
    } catch (error) {
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/add');
    }
    

    req.flash('success', 'Post salvo com sucesso');

    res.redirect('/');
}

exports.edit = async (req, res) => {
    // 1 Pegar as infomacoes do post
    const post = await Post.findOne({slug:req.params.slug});
    // 2 Carregar formulario de edicao
    res.render('postEdit', { post });

}

exports.editAction = async (req, res) => {
    //Alterando slug ao editar o post
    req.body.slug = slug(req.body.title, {lower:true})
    try{
        const post = await Post.findOneAndUpdate(
            { slug:req.params.slug },
            req.body,
            {
                new:true, //Retornar novo item atualizado
                runValidators: true
            }
        );
    } catch(error){
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/'+req.params.slug+'/edit');
    };

    req.flash('success','Post atualizado com sucesso');
    res.redirect('/');

};