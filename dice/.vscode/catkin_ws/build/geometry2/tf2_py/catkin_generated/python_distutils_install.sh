#!/bin/sh

if [ -n "$DESTDIR" ] ; then
    case $DESTDIR in
        /*) # ok
            ;;
        *)
            /bin/echo "DESTDIR argument must be absolute... "
            /bin/echo "otherwise python's distutils will bork things."
            exit 1
    esac
fi

echo_and_run() { echo "+ $@" ; "$@" ; }

echo_and_run cd "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/geometry2/tf2_py"

# ensure that Python install destination exists
echo_and_run mkdir -p "$DESTDIR/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/install/lib/python3/dist-packages"

# Note that PYTHONPATH is pulled from the environment to support installing
# into one location when some dependencies were installed in another
# location, #123.
echo_and_run /usr/bin/env \
    PYTHONPATH="/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/install/lib/python3/dist-packages:/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/lib/python3/dist-packages:$PYTHONPATH" \
    CATKIN_BINARY_DIR="/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build" \
    "/usr/bin/python3" \
    "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/src/geometry2/tf2_py/setup.py" \
    egg_info --egg-base /afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/geometry2/tf2_py \
    build --build-base "/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/build/geometry2/tf2_py" \
    install \
    --root="${DESTDIR-/}" \
    --install-layout=deb --prefix="/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/install" --install-scripts="/afs/inf.ed.ac.uk/user/s20/s2030247/Documents/stagehands/basebot/catkin_ws/install/bin"
