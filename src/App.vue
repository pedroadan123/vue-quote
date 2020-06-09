<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <button class="btn btn-primary" @click.prevent="getQuote">Get Quote</button>
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <label>ID</label>
                <input class="form-control" v-model="quoteId" />
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <label>en</label>
                <input class="form-control" v-model="en" />
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <label>Author</label>
                <input class="form-control" v-model="author" />
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <h3>Set rating</h3>
                <star-rating :show-rating="false" :star-size="40" v-model="rating"></star-rating>
                <div class="form-group">
                    <button class="btn btn-primary" @click.prevent="setRating">Set Vote</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                quoteId: "",
                en: "",
                author: "",
                rating: 3
            }
        },
        methods: {
            getQuote() {
                this.$axios
                    .get('https://programming-quotes-api.herokuapp.com/quotes/random')
                    .then(response => {
                        this.quoteId = response.data.id;
                        this.en = response.data.en;
                        this.author = response.data.author;
                    })
            },
            getAllQuotes() {
                this.$axios
                    .get('https://programming-quotes-api.herokuapp.com/quotes')
                    .then(response => { 
                        for (let i = 0; i < response.data.length; i++) {
                            let quote = response.data[i];
                            if (quote.author == this.author && quote.id != this.quoteId) {
                                this.quoteId = quote.id;
                                this.en = quote.en;
                                break ;
                            }
                        }
                    })
            }, 
            setRating: function() {
                if (this.rating < 4) {
                    console.log("getQuote");
                    this.getQuote();
                } else {
                    if (this.quoteId == "") {
                        alert("Please select a quote!");
                    } else {
                        this.getAllQuotes();
                    }
                }
            },
        }
    }
</script>

<style>
    body {
        margin-top: 30px;
    }
     
    .vue-star-rating {
        margin-bottom: 5px;
    }
</style>