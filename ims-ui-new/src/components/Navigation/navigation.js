import React from 'react';
import {Link} from 'react-router-dom';
import "./navigation.css";
import $ from 'jquery';
// Multilanguage
import {withTranslate} from 'react-redux-multilingual'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const menu = [
    {
        deptName: "Electronics",
        categories: [
            {
                categoryName: "Clothing",
                categories: [
                    {
                        categoryName: "Shoes"
                    }
                ]
            }
        ]
    },
    {
        deptName: "MEN",
        categories: [
            {
                categoryName: "Clothing",
                categories: [
                    {
                        categoryName: "Trousers"
                    }
                ]
            }
        ]
    },
    {
        deptName: "WOMEN",
        categories: [
            {
                categoryName: "Clothing",
                categories: [
                    {
                        categoryName: "shirts"
                    }
                ]
            }
        ]
    },
    {
        deptName: "HOME&FURNITURE",
        categories: [
            {
                categoryName: "Home Automation",
                categories: [
                    {
                        categoryName: "Shoes"
                    }
                ]
            }
        ]
    },
    {
        deptName: "MORE",
        categories: [
            {
                categoryName: "Home Automation",
                categories: [
                    {
                        categoryName: "Shoes"
                    }
                ]
            }
        ]
    },
]


class Navigation extends React.Component {
    componentDidMount() {
        let hover = false;
        let megamenuresponsive = false;
        const responsive_design = 'yes';
        $(document).ready(function () {
            setInterval(function () {
                if ($(".megamenu .with-sub-menu.active").length > 0) {
                    $("#menu-hover-background").addClass("active");
                } else {
                    $("#menu-hover-background").removeClass("active");
                }
            }, 10);
            if (responsive_design === 'yes' && $(window).width() < 992) {
                megamenuresponsive = true;
            }

            $("ul.megamenu > li").each(function () {
                let i = 0;
                $(this).find(".mobile-enabled").each(function () {
                    i++;
                });

                if (i === 0) {
                    $(this).find(".open-menu").addClass("mobile-disabled");
                }
            });

            $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function () {
                $(this).children("ul").addClass("active");
            }, function () {
                $(this).children("ul").removeClass("active");
            });

            $('.close-categories').on('click', function () {
                $(this).parent().removeClass("active");
                $(this).next().animate({height: "hide"}, 400);
                return false;
            });

            $('.open-categories').on('click', function () {
                $(".open-categories").parent().removeClass("active");
                $('.open-categories').next().next().animate({height: "hide"}, 400);

                $(this).parent().addClass("active");
                $(this).next().next().animate({height: "show"}, 400);
                return false;
            });

            $('.close-menu').on('click', function () {
                $(this).parent().removeClass("active");
                $(this).next().next().next().animate({height: "hide"}, 400);
                return false;
            });

            $('.open-menu').on('click', function () {
                $("ul.megamenu > li").removeClass("active");
                $("ul.megamenu > li").find(".sub-menu").animate({height: "hide"}, 400);

                $(this).parent().addClass("active");
                $(this).next().next().animate({height: "show"}, 400);
                megamenuresponsive = true;
                return false;
            });

            $("ul.megamenu > li.click .content a").click(function () {
                window.location = $(this).attr('href');
            });

            $("ul.megamenu > li.hover").hover(function () {
                if (megamenuresponsive === false) {
                    hover = true;
                    $("ul.megamenu > li").removeClass("active");
                    $(this).addClass("active");
                    $(this).children(".sub-menu").css("right", "auto");
                    const $whatever = $(this).children(".sub-menu");
                    const ending_right = ($(window).width() - ($whatever.offset().left + $whatever.outerWidth()));
                    const $whatever2 = $("ul.megamenu");
                    const ending_right2 = ($(window).width() - ($whatever2.offset().left + $whatever2.outerWidth()));
                    if (ending_right2 > ending_right) {
                        $(this).children(".sub-menu").css("right", "0");
                    }
                    const widthElement = $(this).children("a").outerWidth() / 2;
                    const marginElement = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                    $(this).find(".content > .arrow").css("left", marginElement + widthElement);
                }
            }, function () {
                if (megamenuresponsive === false) {
                    const rel = $(this).attr("title");
                    hover = false;
                    if (rel === 'hover-intent') {
                        const hoverintent = $(this);
                        setTimeout(function () {
                            if (hover === false) {
                                $(hoverintent).removeClass("active");
                            }
                        }, 500);
                    } else {
                        $(this).removeClass("active");
                    }
                }
            });

            $("ul.megamenu > li.click").click(function () {
                if ($(this).removeClass("active") === true) {
                    return false;
                }
                hover = true;
                $("ul.megamenu > li").removeClass("active");
                $(this).addClass("active");
                $(this).children(".sub-menu").css("right", "auto");
                if (megamenuresponsive === true) $(this).children(".sub-menu").animate({height: "show"}, 400);
                const $whatever = $(this).children(".sub-menu");
                const ending_right = ($(window).width() - ($whatever.offset().left + $whatever.outerWidth()));
                const $whatever2 = $("ul.megamenu");
                const ending_right2 = ($(window).width() - ($whatever2.offset().left + $whatever2.outerWidth()));
                if (ending_right2 > ending_right) {
                    $(this).children(".sub-menu").css("right", "0");
                }
                const widthElement = $(this).children("a").outerWidth() / 2;
                const marginElement = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                $(this).find(".content > .arrow").css("left", marginElement + widthElement);
                return false;
            });

            $(".categories-image-right ul > li > a").hover(function () {
                $(this).closest('.categories-image-right').find('img').attr('src', $(this).attr('data-image'));
            }, function () {
                const src = $(this).closest('.categories-image-right').attr('data-image');
                $(this).closest('.categories-image-right').find('img').attr('src', src);
            });

            $(".megaMenuToggle").click(function () {
                if ($(this).removeClass("active") === true) {
                    $(this).parent().find(".megamenu-wrapper").stop(true, true).animate({height: "hide"}, 400);
                } else {
                    $(this).parent().find(".megamenu-wrapper").stop(true, true).animate({height: "toggle"}, 400);
                    $(this).addClass("active");
                }
                return false;
            });

            $('html').on('click', function () {
                if (!(responsive_design === 'yes' && $(window).width() < 768)) {
                    $("ul.megamenu > li.click").removeClass("active");
                }
            });
        });

        $(window).resize(function () {
            megamenuresponsive = false;

            if (responsive_design === 'yes' && $(window).width() < 992) {
                megamenuresponsive = true;
            }
        });
    }

    render() {
        return (
            <Paper id="megamenu" className="container-megamenu container horizontal">
                <div className="megaMenuToggle">
                    <div className="megamenuToogle-wrapper">
                        <div className="megamenuToogle-pattern">
                            <div className="container">
                                <div><span/><span/><span/></div>
                                Categories
                            </div>
                        </div>
                    </div>
                </div>
                <div className="megamenu-wrapper">
                    <div className="megamenu-pattern">
                        <div className="container">
                            <ul className="megamenu shift-up">
                                {menu.map((dept, index) => {
                                    return <li className="with-sub-menu hover">
                                        <p className="close-menu"/>
                                        <p className="open-menu"/>
                                        <Link to="/shop"
                                              className="clearfix"><span><strong>{dept.deptName}</strong></span></Link>
                                        <div className="sub-menu" style={{width: '100%'}}>
                                            <div className="content">
                                                <p className="arrow"/>
                                                <Grid container spacing={3}>
                                                    {dept.categories.map((category, index) => {
                                                        return <Grid item md={3}>
                                                            {category.categoryName}
                                                            <List dense={"false"}>
                                                                {category.categories.map((category, index) => {
                                                                    return <ListItem>
                                                                        <ListItemText
                                                                            primary={category.categoryName}
                                                                            // secondary={secondary ? 'Secondary text' : null}
                                                                        />
                                                                    </ListItem>
                                                                })}
                                                            </List>
                                                        </Grid>
                                                    })}
                                                </Grid>
                               
                                            </div>
                                        </div>
                                    </li>
                                })}
                                {/*<li className="home"><Link to="/"><i className="fa fa-home"/></Link></li>*/}

                            </ul>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default withTranslate(Navigation);