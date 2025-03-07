.. lost documentation master file, created by
   sphinx-quickstart on Wed Nov 14 10:46:34 2018.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to LOST's documentation!
================================

.. figure:: images/LOSTFeaturesIn40seconds.gif

    LOST features in a nutshell.

About LOST
=================
LOST (Label Object and Save Time) is a **flexible** **web-based** framework
for **semi-automatic** image annotation.
It provides multiple annotation interfaces for fast image annotation.

LOST is **flexible** since it allows to run user defined annotation
pipelines where different
annotation interfaces/ tools and algorithms can be combined in one process.

It is **web-based** since the whole annotation process is visualized in
your browser.
You can quickly setup LOST with docker on your local machine or run it
on a web server to make an annotation process available to your
annotators around the world.
LOST allows to organize label trees, to monitor the state of an
annotation process and to do annotations inside the browser.

LOST was especially designed to model **semi-automatic** annotation
pipelines to speed up the annotation process.
Such a semi-automatic can be achieved by using AI generated annotation
proposals that are presented to an annotator inside the annotation tool.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

        Getting Started <getting_started.rst>
        Quick Setup <quick_setup.rst>
        For Annotators <annotators.rst>
        The LOST Ecosystem <lost_ecosystem.rst>
        For Pipeline Designers <designers.rst>
        ALL About Pipelines <all_about_pipelines.rst>
        All About Scripts <all_about_scripts.rst>
        Command Line Interface <lost_cli.rst>
        .. Advanced Setup <advanced_setup.rst>
        Users and Groups <users_groups.rst>
        Conventions <conventions.rst>
        PyAPI <pyapi.rst>

Indices and tables
==================

* :ref:`genindex`
* :ref:`search`
